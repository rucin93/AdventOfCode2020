import { getLinesFromFile } from '../utils'
import { advancedPlay, basicPlay } from './history'

const entries = getLinesFromFile(`${__dirname}/input.txt`, ',').map(Number)

console.time('Before')
console.log(basicPlay(entries, 2020))
console.timeEnd('Before')
console.time('After')
console.log(advancedPlay(entries, 2020))
console.timeEnd('After')
