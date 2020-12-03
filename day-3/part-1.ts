import { getLinesFromFile } from '../utils'

const entries = getLinesFromFile(`${__dirname}/input.txt`)

const lines = entries.length

const checkGrid = (x, y) => {
    const grid = []
    for (let i = 0; i < x * lines; i++) {
        grid[i] = ''.padStart(y * lines, entries[i])
    }
    let i = 0, j = 0;
    const getNextPoint = () => grid[i].charAt(j, i+=x, j+=y)

    let counter = 0
    for(let k = 0; k < lines; k++) {
        if(getNextPoint() === '#') counter++;
    }

    return counter
}

console.log(checkGrid(1,3))