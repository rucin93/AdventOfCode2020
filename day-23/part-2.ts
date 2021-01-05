import { parseLabels, createPick, action } from './helper'

const input = `853192647`
const labels = parseLabels(input)
const max = 1000000
const map = {}
for (let i = 0; i < max; i++) {
    map[labels[i] || i + 1] = labels[i + 1] || i + 2
}
map[max] = labels[0]

let curr = labels[0]
for (let i = 0; i < max * 10; i++) {
    const pick = createPick(map, curr)

    let next = ((curr - 2 + max) % max) + 1
    while (pick.includes(next)) {
        next = ((next - 2 + max) % max) + 1
    }
    const tmp = map[next]

    map[curr] = map[pick[2]]
    map[next] = pick[0]
    map[pick[2]] = tmp
    curr = map[curr]
}
console.log(map[1] * map[map[1]])

// const res = action(input, map, max * 10, curr)
// console.log(res[1] * res[res[1]])
