import { getLinesFromFile } from '../utils'
import { parseBoarding } from './boarding'

const entries = getLinesFromFile(`${__dirname}/input.txt`)
const list = entries.map(entry => parseBoarding(entry)).sort((a, b) => a - b)

for (let i = 0; i < list.length; i++) {
    if (list[i + 1] - list[i] === 2) {
        console.log(list[i] + 1)
        break
    }
}
