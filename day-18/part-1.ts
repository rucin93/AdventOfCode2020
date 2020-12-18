import { add, getLinesFromFile } from '../utils'
import { solve } from './data'

const entries = getLinesFromFile(`${__dirname}/input.txt`)

const evaluate = exp => {
    const expParts = exp.split(' ')
    let sum = parseInt(expParts.shift())

    for (let i = 0; i < expParts.length; i += 2) {
        const b = parseInt(expParts[i + 1])
        sum = expParts[i] === '*' ? sum * b : sum + b
    }

    return sum
}

const results = entries.map(element => solve(element, evaluate))

console.log(results.reduce(add))
