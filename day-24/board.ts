import { move } from './helper'
import { Tile } from './tile'

export class Board {
    private tiles: any

    constructor(directions = [], reference = [0, 0]) {
        this.tiles = {}
        directions
            .map(directions =>
                directions.reduce((pos, dir) => move(pos, dir), reference)
            )
            .forEach(coords => this.getTile(coords).flip())
    }

    getTile(coords) {
        if (!(coords in this.tiles)) this.tiles[coords] = new Tile(coords)
        return this.tiles[coords]
    }

    blackTiles() {
        return Object.keys(this.tiles)
            .map(coords => this.tiles[coords])
            .filter(tile => tile.isBlack)
    }

    neighborsOf(tile) {
        return tile.getNeighbor().map(coords => this.getTile(coords))
    }

    countBlackNeighbors(tile) {
        return this.neighborsOf(tile).filter(neighbor => neighbor.isBlack)
            .length
    }

    next(tile) {
        const count = this.countBlackNeighbors(tile)
        if (tile.isBlack) return [1, 2].includes(count)
        else return count === 2
    }

    evolve(tile) {
        return new Tile(tile.coords, this.next(tile))
    }

    flip() {
        const nextDay = {}
        this.blackTiles().forEach(tile => {
            nextDay[tile.coords] = this.evolve(tile)
            this.neighborsOf(tile).forEach(neighbor => {
                nextDay[neighbor.coords] = this.evolve(neighbor)
            })
        })
        this.tiles = nextDay
    }

    makeFlips(numDays) {
        for (let i = 0; i < numDays; i++) this.flip()
    }
}
