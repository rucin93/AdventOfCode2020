interface Region {
    start: number
    end: number
}

const decodeString = (region: Region, value: string): number => {
    for (let type of value) {
        let x = (region.start + region.end) / 2

        if (type === 'B' || type === 'R') {
            region.start = 0 | (x + 0.5)
        } else {
            region.end = 0 | x
        }
    }

    if (region.start !== region.end) {
        console.error('start and end boundaries should be equal!')
    }

    return region.end
}

export function parseBoarding(encoded: string): number {
    const row = decodeString({ start: 0, end: 127 }, encoded.slice(0, 7))
    const column = decodeString({ start: 0, end: 7 }, encoded.slice(-3))

    return row * 8 + column
}
