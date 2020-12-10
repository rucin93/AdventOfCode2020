import { getLinesFromFile } from '../utils'
import { parseEntries } from './bags'

const bags = parseEntries(getLinesFromFile(`${__dirname}/input.txt`))

const traverseDown = bag => {
    let result = 0

    for (const { color, quantity } of bags[bag]) {
        result += quantity + quantity * traverseDown(color)
    }

    return result
}

console.log(traverseDown('shiny gold'))
