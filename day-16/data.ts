export function parseData(part: string): number[][] {
    return part.split('\n').map(field => {
        const [
            ,
            r1min,
            r1max,
            r2min,
            r2max
        ] = /: (\d+)-(\d+) or (\d+)-(\d+)/.exec(field)

        return [
            parseInt(r1min),
            parseInt(r1max),
            parseInt(r2min),
            parseInt(r2max)
        ]
    })
}

export function parseTicket(part: string): number[][] {
    return part
        .split('\n')
        .slice(1)
        .map(line => line.split(',').map(Number))
}

export function flat(array: any[][]): any[] {
    return array
        .map(e => e.join(','))
        .join(',')
        .split(',')
        .map(Number)
}

export function isInRange(ticket: number, array: number[][]): boolean {
    return array.some(
        ([r1min, r1max, r2min, r2max]) =>
            (ticket >= r1min && ticket <= r1max) ||
            (ticket >= r2min && ticket <= r2max)
    )
}
