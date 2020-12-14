export function calculate(
    entries: string[],
    mask: (a: number, b: number, bits: any[]) => number | number[]
): number[] {
    const memory = new Map()
    let bits

    for (const entry of entries) {
        if (/mask/.test(entry)) {
            bits = /mask = (.*)/.exec(entry)[1].split('')
        } else if (/mem/.test(entry)) {
            const [, address, value] = /mem\[(\d+)] = (\d+)/.exec(entry)
            const res = mask(parseInt(value), parseInt(address), bits)

            if (typeof res !== 'number') {
                res.forEach(address => memory.set(address, parseInt(value)))
            } else {
                memory.set(parseInt(address), res)
            }
        }
    }

    return Array.from(memory.values())
}
