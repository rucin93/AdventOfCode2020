import { desc, getLinesFromFile } from '../utils'
import { calculateScore, parseDecks } from './decks'

const entries = getLinesFromFile(`${__dirname}/input.txt`, '\n\n')
const decks = parseDecks(entries)

while (decks.every(deck => deck.length)) {
    const top = decks.map(deck => deck.shift())
    const winner = top[1] > top[0] ? 1 : 0
    decks[winner].push(...top.sort(desc))
}

console.log(calculateScore(decks))
