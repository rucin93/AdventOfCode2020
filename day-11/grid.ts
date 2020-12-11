interface Point {
    readonly x
    readonly y
    readonly column
    readonly row
}

const TAKEN = '#'
const EMPTY = 'L'
const FLOOR = '.'

const adjastentsHelper = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1]
]

export { TAKEN, EMPTY }

export function iteration(
    grid: string[][],
    cb: (point: Point) => string
): string[][] {
    return grid.map((row, y) => {
        return row.map((column, x) => {
            return cb({ x, y, column, row })
        })
    })
}

export function printGrid(state: string[][]): string {
    return state.map(row => row.join('')).join('\n')
}

export function getItem(state: string[][], x: number, y: number): string {
    return (state[y] || [])[x] || FLOOR
}

const process = (state: string[][], x: number, y: number) => {
    return ([dx, dy]) => {
        let steps = 1

        while (true) {
            const [a, b] = [x + dx * steps, y + dy * steps]

            if (!state[b] || !state[b][b]) return FLOOR
            if (state[b][a] !== FLOOR) return state[b][a]

            steps++
        }
    }
}

export function getAdjacsent(
    state: string[][],
    cb: (column: string, length: number) => string
): string[][] {
    return iteration(state, ({ x, y, column }) => {
        const occupied = adjastentsHelper
            .map(([dx, dy]) => getItem(state, x - dx, y - dy))
            .filter(seat => seat === TAKEN).length

        return cb(column, occupied)
    })
}

export function getAdjacsentSee(
    state: string[][],
    cb: (column: string, length: number) => string
): string[][] {
    return iteration(state, ({ x, y, column }) => {
        const occupied = adjastentsHelper
            .map(process(state, x, y))
            .filter(seat => seat === TAKEN).length

        return cb(column, occupied)
    })
}

export function countItems(entries: string[][], item: string): number {
    let c = 0
    iteration(entries, ({ column }) => {
        column === item ? c++ : 0
        return ''
    })

    return c
}
