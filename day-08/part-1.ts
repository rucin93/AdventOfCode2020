import { getLinesFromFile } from '../utils'
import { parseEntries, runInstructions } from './instructions'

const entries = parseEntries(getLinesFromFile(`${__dirname}/input.txt`))
const { counter } = runInstructions(entries)
console.log(counter)
