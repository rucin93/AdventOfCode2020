import { getLinesFromFile, add } from '../utils'
import { calculate } from './mask'

const entries = getLinesFromFile(`${__dirname}/input.txt`)

const mask = (value, _, bitmask) => {
    const bits = value.toString(2).padStart(36, '0').split('')
    const result = bitmask.map((bit, i) => (bit === 'X' ? bits[i] : bit))

    return parseInt(result.join(''), 2)
}

console.log(calculate(entries, mask).reduce(add))
