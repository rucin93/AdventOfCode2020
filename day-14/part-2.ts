import { add, getLinesFromFile } from '../utils'
import { calculate } from './mask'

const entries = getLinesFromFile(`${__dirname}/input.txt`)

const mask = (_, value, bitmask) => {
    const addr = value.toString(2).padStart(36, '0').split('')
    const temp = bitmask.map((bit, i) =>
        bit === 'X' ? 'X' : bit === '0' ? addr[i] : bit
    )
    const num = temp.filter(bit => bit === 'X').length

    return Array.from({ length: Math.pow(2, num) }).map((_, i) => {
        const comb = i.toString(2).padStart(num, '0').split('')

        return parseInt(
            temp.map(bit => (bit === 'X' ? comb.shift() : bit)).join(''),
            2
        )
    })
}

console.log(calculate(entries, mask).reduce(add))
