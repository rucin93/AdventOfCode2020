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

export function deepClone<Type>(target: Type): Type {
    return JSON.parse(JSON.stringify(target))
}

export function add(a: number, b: number): number {
    return a + b
}

export function multiply(a: any, b: any): number {
    return parseInt(a) * parseInt(b)
}

export function asc(a: any, b: any): number {
    return a - b
}

export function desc(a: any, b: any): number {
    return b - a
}

export function isInRange(min: number, value: number, max: number): boolean {
    return value >= min && value <= max
}
