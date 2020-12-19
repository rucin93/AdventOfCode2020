import { rules, messages } from './input'
import { count } from './validator'

function patch(rules) {
    rules[8] = [[42], [42, 8]]
    rules[11] = [
        [42, 31],
        [42, 11, 31]
    ]
    return rules
}

console.log(count(patch(rules), messages))
