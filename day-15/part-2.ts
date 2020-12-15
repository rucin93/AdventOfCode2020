import { getLinesFromFile } from '../utils'
import { advancedPlay, basicPlay } from './history'

const entries = getLinesFromFile(`${__dirname}/input.txt`, ',').map(Number)

console.time('Before')
console.log(basicPlay(entries, 30000000))
console.timeEnd('Before')
console.time('After')
console.log(advancedPlay(entries, 30000000))
console.timeEnd('After')
