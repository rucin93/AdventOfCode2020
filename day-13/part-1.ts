import { getLinesFromFile } from '../utils'

const calc = (id, ts) => id - (ts % id)
const entries = getLinesFromFile(`${__dirname}/input.txt`)

let ts = parseInt(entries[0])
let ids = entries[1]
    .split(',')
    .map(Number)
    .filter(e => !isNaN(e))

let min = Infinity
let minId = null

ids.forEach(id => {
    const curr = calc(id, ts)
    if (curr < min) {
        min = curr
        minId = id
    }
})

console.log(min * minId)
