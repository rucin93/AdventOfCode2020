/*
Not optimized
calc time ~3s
*/
export function basicPlay(entries: number[], iterations: number): number {
    const history = new Map(entries.map((x, i) => [x, i]))

    let current = 0
    let next = 0

    for (let i = entries.length; i < iterations; i++) {
        current = next
        next = history.has(current) ? i - history.get(current) : 0
        history.set(current, i)
    }
    return current
}

/*
OPTIMIZED
*/

export function advancedPlay(entries: number[], iterations: number): number {
    const memory = new Array(iterations).fill(null)
    for (let i = 0; i < entries.length; i++) {
        const number = entries[i]
        memory[number] = i
    }

    let current = 0
    let next = 0

    for (let i = entries.length; i < iterations; i++) {
        current = next
        next = memory[current] !== null ? i - memory[current] : 0
        memory[current] = i
    }

    return current
}
