export function createMap(input: string, max: number): object {
    const labels = input.split('').map(Number)

    return labels.reduce((nextMap, label, i) => {
        nextMap[label] = labels[(i + 1) % max]
        return nextMap
    }, {})
}

export function createPick(nextMap, curr): number[] {
    return [
        nextMap[curr],
        nextMap[nextMap[curr]],
        nextMap[nextMap[nextMap[curr]]]
    ]
}

export function parseLabels(input) {
    return input.split(``).map(Number)
}

export function action(input, map, max, current) {
    let curr = current || parseInt(input[0])

    for (let i = 0; i < max; i++) {
        const pick = createPick(map, curr)

        let next = ((curr - 2 + max) % max) + 1
        while (pick.includes(next)) {
            next = ((next - 2 + max) % max) + 1
        }
        const tmp = map[next]

        map[curr] = map[pick[2]]
        map[next] = pick[0]
        map[pick[2]] = tmp
        curr = map[curr]
    }

    return map
}
