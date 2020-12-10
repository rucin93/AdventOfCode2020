import { getLinesFromFile } from '../utils'
import { findInvalidNumber } from './numbers'

const numbers = getLinesFromFile(`${__dirname}/input.txt`).map(Number)
const preambleLength = 25

console.log(findInvalidNumber(numbers, preambleLength))
