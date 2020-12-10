import { getLinesFromFile } from '../utils'
import { parseEntries } from './bags'

const bags = parseEntries(getLinesFromFile(`${__dirname}/input.txt`))

const traverseUp = (bag, map) => {
    Object.keys(bags).forEach(item => {
        if (bags[item].filter(el => el.color === bag).length > 0) {
            if (map.indexOf(item) < 0) {
                map.push(item)
                traverseUp(item, map)
            }
        }
    })
    return map.length
}

console.log(traverseUp('shiny gold', []))
