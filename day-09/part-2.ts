import { getLinesFromFile, asc } from '../utils'
import { findInvalidNumber } from './numbers'

const numbers = getLinesFromFile(`${__dirname}/input.txt`).map(Number)
const preambleLength = 25

const INVALID_NUMBER = findInvalidNumber(numbers, preambleLength)
const array = numbers.slice(0, numbers.indexOf(INVALID_NUMBER) + 1)
const length = array.length

let range = []
let counter = 0

const append = (value, range) => {
    counter += value
    range.push(value)
}

for (let i = 0; i < length; i++) {
    counter = 0
    range = []

    append(array[i], range)

    for (let j = i + 1; j < length; j++) {
        append(array[j], range)

        if (counter > INVALID_NUMBER) break

        if (counter === INVALID_NUMBER) {
            const sorted = range.sort(asc)
            console.log(sorted.shift() + sorted.pop())
        }
    }
}
