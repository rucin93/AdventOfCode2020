import { getLinesFromFile } from '../utils'

const entries = getLinesFromFile(`${__dirname}/input.txt`)

let counter = 0

for (let i = 0; i < entries.length; i++) {
    const [range, letter, pass] = entries[i].split(` `)
    const [first, second] = range.split(`-`).map(el => +el - 1) // -1 because string index start at 0, not 1
    let valid = false

    if (pass[first] === letter[0]) valid = !valid
    if (pass[second] === letter[0]) valid = !valid

    if (valid) {
        counter++
    }
}

console.log(counter)
