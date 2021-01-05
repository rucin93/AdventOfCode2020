import { getLinesFromFile } from '../utils'
import { listOfTileDirections } from './helper'
import { Board } from './board'

const entries = getLinesFromFile(`${__dirname}/input.txt`)
const board = new Board(listOfTileDirections(entries))

console.log(board.blackTiles().length)
