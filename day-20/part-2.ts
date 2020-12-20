import { rotate } from './arrayUtils'
import { getLinesFromFile } from '../utils'
import {
    generateImage,
    getEdgesId,
    parseConnections,
    parseEdges,
    parseImageData,
    parseTiles
} from './parse'

const sumLength = (r, line) => r + line.match(/#/g).length
const getValue = (arr, x, y) => arr[y][x]

const monster = `                  # 
#    ##    ##    ###
 #  #  #  #  #  #   `.split('\n')

const entries = getLinesFromFile(`${__dirname}/input.txt`, '\n\n')

const tiles = parseTiles(entries)
const tileEdges = parseEdges(tiles)
const edgeToId = getEdgesId(tileEdges)
const connections = parseConnections(tileEdges, edgeToId)

const topLeftId = Object.keys(connections).find(id => {
    const [top, right, bottom, left] = connections[id]
    return !top && right && bottom && !left
})

const topLeft = { id: topLeftId, rotate: 0 }
const length = Math.sqrt(Object.keys(tiles).length / 2)
const imageData = parseImageData(length, topLeft, connections)
const image = generateImage(length, imageData, tiles)

for (let deg of [0, 90, 180, 270]) {
    for (let flip of [true, false]) {
        const mon = rotate(monster, deg)
        if (flip) mon.reverse()

        let monsterCounter = 0
        const yLen = image.length - mon.length
        const xLen = image[0].length - mon[0].length

        for (let i = 0; i < yLen; i++) {
            for (let j = 0; j < xLen; j++) {
                let stop = false
                for (let y = 0; y < mon.length; y++) {
                    for (let x = 0; x < mon[0].length; x++) {
                        if (
                            getValue(mon, x, y) === '#' &&
                            getValue(image, j + x, i + y) === '.'
                        ) {
                            stop = true
                            break
                        }
                    }
                    if (stop) break
                }
                if (!stop) monsterCounter++
            }
        }
        if (monsterCounter) {
            const monsterLen = monster.reduce(sumLength, 0)
            const imageLen = image.reduce(sumLength, 0)
            console.log(imageLen - monsterCounter * monsterLen)
        }
    }
}
