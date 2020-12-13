import { getLinesFromFile } from '../utils'
import { calculateShipPosition, manhattanDistance } from './ship'

const entries = getLinesFromFile(`${__dirname}/input.txt`)

const ship = calculateShipPosition(entries)

console.log(manhattanDistance(ship))
