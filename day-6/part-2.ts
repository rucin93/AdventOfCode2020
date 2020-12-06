import { getLinesFromFile, add } from '../utils'
import { getUniqueValues, prepareData } from './group'

const entries = getLinesFromFile(`${__dirname}/input.txt`, `\n\n`)

const result = entries
    .map(group => {
        const data = prepareData(group)
        const dataString = data.join(``)

        let counter = 0
        for (let item of getUniqueValues(group)) {
            counter += dataString.split(item).length - 1 === data.length ? 1 : 0
        }

        return counter
    })
    .reduce(add)

console.log(result)
