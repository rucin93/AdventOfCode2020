import { getLinesFromFile } from '../utils'

const entries = getLinesFromFile(`${__dirname}/input.txt`)
let highest = 0

const group = []

entries.forEach(entry => {
    const first = entry.substr(0, 7)
    const last = entry.slice(-3)

    let upper = 127
    let lower = 0

    console.log(first)

    for (let type of first) {
        let x = (upper + lower) / 2

        if (type === 'B') {
            lower = 0 | x + .5
        } else {
            upper = 0 | x
        }
    }

    let a = 7
    let b = 0

    for (let row of last) {
        let x = (a + b) / 2

        if (row === 'R') {
            b = 0 | x + .5
        } else {
            a = 0 | x
        }
    }

    group.push(upper * 8 + a)
})

console.log(group.sort((a,b)=>b-a)[0])