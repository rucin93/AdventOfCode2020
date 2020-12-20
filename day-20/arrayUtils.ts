export function rotate90(a) {
    const w = a.length
    const h = a[0].length
    let b = new Array(h)
    for (let y = 0; y < h; y++) {
        b[y] = new Array(w)
        for (let x = 0; x < w; x++) {
            b[y][x] = a[w - 1 - x][y]
        }
    }
    return b
}

export function rotate180(a) {
    const w = a[0].length
    const h = a.length
    let b = new Array(h)
    for (let y = 0; y < h; y++) {
        let n = h - 1 - y
        b[n] = new Array(w)
        for (let x = 0; x < w; x++) {
            b[n][w - 1 - x] = a[y][x]
        }
    }
    return b
}

export function rotate270(a) {
    const w = a.length
    const h = a[0].length
    let b = new Array(h)
    for (let y = 0; y < h; y++) {
        b[y] = new Array(w)
        for (let x = 0; x < w; x++) {
            b[y][x] = a[x][h - 1 - y]
        }
    }
    return b
}

export function rotate(a: any[], degrees: number) {
    const normalized = ((degrees % 360) + 360) % 360
    if (normalized === 90) {
        return rotate90(a)
    } else if (normalized === 180) {
        return rotate180(a)
    } else if (normalized === 270) {
        return rotate270(a)
    }

    return a
}
