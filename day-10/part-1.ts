import { getLinesFromFile } from '../utils'

const numbers = getLinesFromFile(`${__dirname}/input.txt`)
    .map(e => parseInt(e))
    .sort((a, b) => a - b)

let last = 0
let one = 0
let three = 0

for (let i = 0; i < numbers.length; i++) {
    const current = numbers[i]

    if (current - last === 1) one++
    if (current - last === 3) three++
    if (i === numbers.length - 1) three++

    last = numbers[i]
}

console.log(one * three)
