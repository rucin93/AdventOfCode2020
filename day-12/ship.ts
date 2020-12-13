interface Ship {
    x: number
    y: number
    heading: number
    wx: number
    wy: number
}

const actions = {
    E: (value, ship) => (ship.x += value),
    W: (value, ship) => (ship.x -= value),
    N: (value, ship) => (ship.y += value),
    S: (value, ship) => (ship.y -= value),
    F: (value, ship) => {
        ship.x += ship.heading === 0 ? value : ship.heading === 180 ? -value : 0
        ship.y +=
            ship.heading === 90 ? value : ship.heading === 270 ? -value : 0
    },
    degrees: (action, value) =>
        action === 'L' ? value : action === 'R' ? -value : 0
}

const actionsWp = {
    E: (value, ship) => (ship.wx += value),
    W: (value, ship) => (ship.wx -= value),
    N: (value, ship) => (ship.wy += value),
    S: (value, ship) => (ship.wy -= value),
    degrees: (action, value) =>
        action === 'L' ? value : action === 'R' ? -value : 0
}

const pair = entry => ({
    action: entry[0],
    value: parseInt(entry.slice(1))
})

export function rotateDeg(origin: number, degrees: number): number {
    return (origin + degrees + 360) % 360
}

export function rotateWp([dx, dy], degrees: number): number[] {
    const rotations = {
        0: [dx, dy],
        90: [-dy, dx],
        180: [-dx, -dy],
        270: [dy, -dx]
    }

    return rotations[(degrees + 360) % 360]
}

export function manhattanDistance(ship: Ship): number {
    return Math.abs(ship.x) + Math.abs(ship.y)
}

export function calculateShipPosition(entries: string[]) {
    const ship = entries.reduce(
        (ship: Ship, entry: string): Ship => {
            const { action, value } = pair(entry)
            const heading = ship.heading

            ship.heading = rotateDeg(heading, actions.degrees(action, value))

            if (action in actions) actions[action](value, ship)

            return ship
        },
        { heading: 0, x: 0, y: 0, wx: 0, wy: 0 }
    )

    return ship
}

export function calculateShipPositionWaypoint(
    entries: string[],
    wx: number,
    wy: number
): Ship {
    const ship = entries.reduce(
        (ship: Ship, entry: string) => {
            const { action, value } = pair(entry)

            if (action in actionsWp) actionsWp[action](value, ship)

            const [wx, wy] = rotateWp(
                [ship.wx, ship.wy],
                actions.degrees(action, value)
            )

            ship.wx = wx
            ship.wy = wy

            if (action === 'F') {
                ship.x += ship.wx * value
                ship.y += ship.wy * value
            }

            return ship
        },
        { heading: 0, x: 0, y: 0, wx, wy }
    )

    return ship
}
