export function parseInputLine(line) {
    let directions = []
    for (let i = 0; i < line.length; i++)
        if (line[i] === 's' || line[i] === 'n')
            directions = [...directions, line[i] + line[++i]]
        else directions = [...directions, line[i]]
    return directions
}

export function move([row, col], direction) {
    switch (direction) {
        case 'e':
            return [row, col + 1]
        case 'w':
            return [row, col - 1]
        case 'se':
            return [row + 1, row % 2 === 0 ? col : col + 1]
        case 'nw':
            return [row - 1, row % 2 === 0 ? col - 1 : col]
        case 'sw':
            return [row + 1, row % 2 === 0 ? col - 1 : col]
        case 'ne':
            return [row - 1, row % 2 === 0 ? col : col + 1]
    }
}

export function listOfTileDirections(entries) {
    return entries
        .filter(line => line.length > 0)
        .map(line => parseInputLine(line))
}
