import { getLinesFromFile } from '../utils'
import { calculateScore, getFinalDecks, parseDecks } from './decks'

const entries = getLinesFromFile(`${__dirname}/input.txt`, '\n\n')
const decks = getFinalDecks(parseDecks(entries))

const score = calculateScore(decks)
console.log(score)
