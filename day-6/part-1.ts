import { getLinesFromFile, add } from '../utils'
import { getUniqueValues } from './group'

const entries = getLinesFromFile(`${__dirname}/input.txt`, `\n\n`)

console.log(entries.map(group => getUniqueValues(group).length).reduce(add))
