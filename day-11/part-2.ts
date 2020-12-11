import { getLinesFromFile } from '../utils'
import { getAdjacsentSee, printGrid, countItems, TAKEN, EMPTY } from './grid'

const entries = getLinesFromFile(`${__dirname}/input.txt`).map(line =>
  line.split('')
)

let last = []
let current = entries

while (printGrid(last) !== printGrid(current)) {
    last = current
    current = getAdjacsentSee(current, (column, length) => {
        return column === EMPTY && length === 0
          ? TAKEN
          : column === TAKEN && length >= 5
            ? EMPTY
            : column
    })
}

console.log(countItems(current, TAKEN))
