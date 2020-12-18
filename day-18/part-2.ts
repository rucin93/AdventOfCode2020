import { add, getLinesFromFile } from '../utils'
import { solve } from './data'

const entries = getLinesFromFile(`${__dirname}/input.txt`)
const evaluate = expression => {
    return expression.split(' * ').reduce((sum, part) => {
        return (
            sum * part.split(' + ').reduce((total, x) => total + parseInt(x), 0)
        )
    }, 1)
}

const results = entries.map(element => solve(element, evaluate))
console.log(results.reduce(add))
