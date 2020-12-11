import { readFileSync } from 'fs'

export function getLinesFromFile(
    file: string,
    separator: string = '\n'
): string[] {
    return readFileSync(file).toString().split(separator)
}

export function getNumbersFromFile(file: string): number[] {
    return getLinesFromFile(file).map(line => parseFloat(line))
}

export function add(a: number, b: number): number {
    return a + b
}

export function deepClone<Type>(target: Type): Type {
    return JSON.parse(JSON.stringify(target))
}

export function asc(a: number, b: number): number {
    return a - b
}

export function desc(a: number, b: number): number {
    return b - a
}
