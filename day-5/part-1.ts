import { getLinesFromFile } from '../utils'
import { parseBoarding } from './boarding'

const entries = getLinesFromFile(`${__dirname}/input.txt`)

console.log(entries.map(entry => parseBoarding(entry)).sort((a, b) => b - a)[0])
