import { getLinesFromFile } from '../utils'

const entries = getLinesFromFile(`${__dirname}/input.txt`).map(Number)

const factor = 20201227
const map = entries.map(key => {
    let current = 1
    let size = 0
    while (current !== key) {
        size++
        current = (current * 7) % factor
    }
    return size
})

let result = 1
for (let i = 0; i < map[0]; i++) {
    result = (result * entries[1]) % factor
}
console.log(result)
