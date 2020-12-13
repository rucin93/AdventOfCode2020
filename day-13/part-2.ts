import { getLinesFromFile } from '../utils'

const entries = getLinesFromFile(`${__dirname}/input.txt`)

const ids = entries[1].split(',').map(Number)

let result = ids[0]
let current = result

ids.forEach((id, index) => {
    if (!isNaN(id)) {
        while ((result + index) % id) result += current
        current *= id
    }
})

console.log(result)
