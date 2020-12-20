interface ImageInfo {
    id: string
    rotate: number
}

export function getEdges(tile: string[]): string[] {
    const top = tile[0]
    const right = tile.map(row => row[row.length - 1]).join('')
    const bottom = [...tile[tile.length - 1]].reverse().join('')
    const left = tile
        .map(row => row[0])
        .reverse()
        .join('')

    return [top, right, bottom, left]
}

export function parseTiles(entries: string[]): object {
    return entries.reduce((tiles, tile) => {
        let [id, ...img] = tile.split('\n')
        id = id.match(/^Tile (\d+):$/)[1]
        tiles[id] = img
        tiles[id + 'f'] = [...img].reverse()
        return tiles
    }, {})
}

export function parseEdges(tiles: object): object {
    return Object.keys(tiles).reduce((tileEdges, id) => {
        tileEdges[id] = getEdges(tiles[id])
        return tileEdges
    }, {})
}

export function getEdgesId(tiles: object): object {
    return Object.keys(tiles).reduce((edgeToId, id) => {
        const edges = tiles[id]
        for (let edge of edges) {
            edgeToId[edge] = edgeToId[edge] || []
            edgeToId[edge].push(id)
        }
        return edgeToId
    }, {})
}

export function parseConnections(tiles: object, edgeToId: object): object {
    return Object.keys(tiles).reduce((tileConnections, id) => {
        const edges = tiles[id]
        const flippedEdges = edges.map(e => e.split('').reverse().join(''))
        tileConnections[id] = []
        for (let edge of flippedEdges) {
            tileConnections[id].push(
                edgeToId[edge]
                    .filter(i => !i.startsWith(id) && !id.startsWith(i))
                    .reduce((acc, i) => {
                        return i
                    }, null)
            )
        }
        return tileConnections
    }, {})
}

export function parseImageData(
    length: number,
    topLeft: ImageInfo,
    connections: object
) {
    const imageData = [...Array(length)].map(() => [])

    for (let y = 0; y < length; y++) {
        for (let x = 0; x < length; x++) {
            if (y === 0 && x === 0) {
                imageData[0][0] = topLeft
                continue
            }

            if (x) {
                const { id: leftId, rotate: leftRotate } = imageData[y][x - 1]
                const id = connections[leftId][(1 - leftRotate + 4) % 4]

                imageData[y][x] = {
                    id,
                    rotate: 3 - connections[id].indexOf(leftId)
                }
                continue
            }

            const { id: topId, rotate: topRotate } = imageData[y - 1][x]
            const id = connections[topId][(2 - topRotate + 4) % 4]
            imageData[y][x] = {
                id,
                rotate: (4 - connections[id].indexOf(topId)) % 4
            }
        }
    }

    return imageData
}

export function generateImage(
    length: number,
    imageData: ImageInfo[][],
    tiles: object
): string[] {
    const image = [...Array(length * 8)].map(e => '')
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            const { id, rotate } = imageData[i][j]
            const tile = tiles[id]
            const tileSize = tile.length - 2
            for (let r = 1; r < tile.length - 1; r++) {
                for (let c = 1; c < tile.length - 1; c++) {
                    const pixel =
                        rotate === 0
                            ? tile[r][c]
                            : rotate === 1
                            ? tile[tile.length - 1 - c][r]
                            : rotate === 2
                            ? tile[tile.length - 1 - r][tile.length - 1 - c]
                            : tile[c][tile.length - 1 - r]

                    image[i * tileSize + r - 1] += pixel
                }
            }
        }
    }
    return image
}
