import { getLinesFromFile, asc } from '../utils'

const elements = getLinesFromFile(`${__dirname}/input.txt`)
    .map(e => parseInt(e))
    .sort(asc)

const map = [1]

elements.forEach((element, i) => {
    let j = i + 1
    while (elements[j] <= element + 3) {
        map[j] = (map[j] || 0) + map[i]
        j++
    }
})

console.log(map.pop() * 2)
