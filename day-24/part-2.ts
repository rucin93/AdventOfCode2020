import { getLinesFromFile } from '../utils'
import { listOfTileDirections } from './helper'
import { Board } from './board'

const entries = getLinesFromFile(`${__dirname}/input.txt`)
const board = new Board(listOfTileDirections(entries))

board.makeFlips(100)
console.log(board.blackTiles().length)
