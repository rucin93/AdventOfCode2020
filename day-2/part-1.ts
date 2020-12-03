import { getLinesFromFile } from '../utils'

const entries = getLinesFromFile(`${__dirname}/input.txt`)

let counter = 0

for (let i = 0; i < entries.length; i++) {
    const [range, letter, pass] = entries[i].split(` `)
    const [from, to] = range.split(`-`).map(el => +el)

    let letterCount = 0
    for (let c of pass) {
      // letter[0] - because letter contains ":" at [1]
        if (c === letter[0]) letterCount++
    }

    if ((from <= letterCount) && (letterCount <= to)) counter++
}

console.log(counter)