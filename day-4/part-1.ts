import { getLinesFromFile } from '../utils'

const entries = getLinesFromFile(`${__dirname}/input.txt`, `

`)
let counter = 0

entries.forEach(entry => {
    const data = {}
    entry.replace(/\n/g, ' ').split(' ').forEach(item => {
        const [key, val] = item.split(':')
        data[key] = val
    })

    if (Object.keys(data).length > (data['cid'] ? 7 : 6)) {
        counter++
    }

})

console.log(counter)