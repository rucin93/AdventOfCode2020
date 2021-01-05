import { action, createMap } from './helper'

const input = `853192647`

const max = input.length
const map = createMap(input, max)
const res = action(input, map, 100, null)

const calculate = map =>
    [...Array(max - 1)]
        .reduce(
            item => {
                item.push(map[item[item.length - 1]])
                return item
            },
            [1]
        )
        .slice(1)
        .join('')
console.log(calculate(res))
