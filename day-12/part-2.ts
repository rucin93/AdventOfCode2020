import { getLinesFromFile } from '../utils'
import { calculateShipPositionWaypoint, manhattanDistance } from './ship'

const entries = getLinesFromFile(`${__dirname}/input.txt`)

const ship = calculateShipPositionWaypoint(entries, 10, 1)

console.log(manhattanDistance(ship))
