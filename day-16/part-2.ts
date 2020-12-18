import { getLinesFromFile } from '../utils'
import { parseData, parseTicket } from './data'

const entries = getLinesFromFile(`${__dirname}/input.txt`, '\n\n')
const [data, my, nearby] = entries
const myTicket = parseTicket(my)[0]

let items = data.split('\n').map(field => {
    const [
        ,
        name,
        min1,
        max1,
        min2,
        max2
    ] = /(.*): (\d+)-(\d+) or (\d+)-(\d+)/.exec(field)

    return [
        name.trim(),
        parseInt(min1),
        parseInt(max1),
        parseInt(min2),
        parseInt(max2)
    ]
})

const nearbyTickets = parseTicket(nearby).filter(ticket => {
    return ticket.every(number =>
        items.some(
            ([, min1, max1, min2, max2]) =>
                (number >= min1 && number <= max1) ||
                (number >= min2 && number <= max2)
        )
    )
})

const columns = Array.from({ length: myTicket.length }).map((_, i) => [
    i,
    nearbyTickets.map(numbers => numbers[i])
])

let result = 1

while (columns.length) {
    const [column, numbers] = columns.shift()

    const matchingElements = items.filter(([, min1, max1, min2, max2]) => {
        // @ts-ignore
        return numbers.every(
            number =>
                (number >= min1 && number <= max1) ||
                (number >= min2 && number <= max2)
        )
    })

    if (matchingElements.length === 1) {
        items = items.filter(([name]) => name !== matchingElements[0][0])

        if (/departure/.test(matchingElements[0][0].toString())) {
            // @ts-ignore
            result *= myTicket[column]
        }
    } else {
        columns.push([column, numbers])
    }
}

console.log(result)
