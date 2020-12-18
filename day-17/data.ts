export function generateCoordMap(depth: number) {
    const cache = []
    const offsets = dimensions => {
        if (dimensions === 0) {
            return [[]]
        } else if (!cache[dimensions]) {
            const rest = offsets(dimensions - 1)
            cache[dimensions] = rest.flatMap(x =>
                [-1, 0, 1].map(n => [n, ...x])
            )
        }
        return cache[dimensions]
    }

    return offsets(depth)
}

export function getNeighbors(input: string): string[] {
    const dimensions = input.split(',').length
    const coords = input.split(',').map(Number)
    const neighborsArray = generateCoordMap(dimensions)

    return neighborsArray.map(coordsArr => {
        let result = ''
        coordsArr.forEach((coord, index) => {
            result += `${coord + coords[index]}`
            if (index + 1 < coords.length) {
                result += ','
            }
        })
        return result
    })
}

export function parseCubes(input: string[], dimensions: number) {
    return input.reduce((state, line, y) => {
        line.split('').forEach((cube, x) => {
            if (cube === '#') {
                state.add(`${x},${y}` + `,0`.repeat(dimensions - 2))
            }
        })

        return state
    }, new Set())
}

export function cycle(state) {
    const neighbors = [...state.values()].reduce((cubes, key) => {
        getNeighbors(key).forEach(cube => cubes.add(cube))

        return cubes
    }, new Set())

    return [...neighbors.values()].reduce((cubes, key) => {
        const numberOfNeighbors = getNeighbors(key).reduce((count, cube) => {
            return state.has(cube) && cube !== key ? count + 1 : count
        }, 0)

        if (
            state.has(key) &&
            numberOfNeighbors >= 2 &&
            numberOfNeighbors <= 3
        ) {
            cubes.add(key)
        } else if (!state.has(key) && numberOfNeighbors === 3) {
            cubes.add(key)
        }

        return cubes
    }, new Set())
}
