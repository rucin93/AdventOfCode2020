export function getUniqueValues(entry: string): Array<string> {
    return Array.from(new Set(prepareData(entry).join('')))
}

export function prepareData(data: string): Array<string> {
    return data.split('\n')
}
