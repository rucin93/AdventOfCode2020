import { getLinesFromFile } from '../utils'

const entries = getLinesFromFile(`${__dirname}/input.txt`)

const lines = entries.length

console.log(checkGrid(1,3))

export function checkGrid (x: number, y :number) :number {
    const grid = []
    for (let i = 0; i < x * lines; i++) {
        grid[i] = ''.padStart( y * lines, entries[i])
    }

    let i = 0, j = 0;
    const getNextPoint = () => grid[i].charAt(j, i += x, j += y)

    let counter = 0
    for ( let k = 0; k < lines; k++ ) {
        if ( getNextPoint() === '#' ) counter++
    }

    return counter
}