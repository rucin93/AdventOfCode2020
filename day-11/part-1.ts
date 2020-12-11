import { getLinesFromFile } from '../utils'
import { getAdjacsent, printGrid, countItems, TAKEN, EMPTY } from './grid'

const entries = getLinesFromFile(`${__dirname}/input.txt`).map(line =>
    line.split('')
)

let last = []
let current = entries

while (printGrid(last) !== printGrid(current)) {
    last = current
    current = getAdjacsent(current, (column, length) => {
        return column === EMPTY && length === 0
          ? TAKEN
          : column === TAKEN && length >= 4
            ? EMPTY
            : column
    })
}

console.log(countItems(current, TAKEN))
