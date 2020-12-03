import { getLinesFromFile } from '../utils'

const entries = getLinesFromFile(`${__dirname}/input.txt`)
const lines = entries.length

const checkGrid = (x, y) => {
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

console.log([[1,1], [1,3], [1, 5], [1,7], [2,1]].map(set => {
    const [x, y] = set
    return checkGrid(x,y)
}).reduce((n,p)=> n * p, 1))