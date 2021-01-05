import { move } from './helper'

export class Tile {
    private coords: any
    private isBlack: boolean

    constructor(coords, isBlack = false) {
        this.coords = coords
        this.isBlack = isBlack
    }

    flip() {
        this.isBlack = !this.isBlack
    }

    getNeighbor() {
        return ['e', 'w', 'se', 'nw', 'sw', 'ne'].map(direction =>
            move(this.coords, direction)
        )
    }
}
