import { getLinesFromFile } from '../utils'
import { flat, isInRange, parseData, parseTicket } from './data'

const entries = getLinesFromFile(`${__dirname}/input.txt`, '\n\n')
const [data, _, nearby] = entries
const fields = parseData(data)

const nearbyTickets = parseTicket(nearby)

const res = flat(nearbyTickets).reduce((rate, ticket) => {
    if (!isInRange(ticket, fields)) rate += ticket

    return rate
}, 0)

console.log(res)
