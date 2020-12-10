import { deepClone } from '../utils'

interface Entry {
    instruction
    readonly value
    been
    readonly last
}

interface Instruction {
    readonly counter
    readonly last
}

export function parseEntries(entries: Array<string>): Array<Entry> {
    return entries.map((element, index) => {
        const [instruction, value] = element.split(' ')
        return {
            instruction,
            value: parseInt(value),
            been: false,
            last: index === entries.length - 1
        }
    })
}

export function createPermutations(entries: Array<Entry>): Array<Array<Entry>> {
    const permutations = []

    entries.forEach((entry, index) => {
        const entriesClone = deepClone(entries)

        if (entry.instruction === 'nop') {
            entriesClone[index].instruction = 'jmp'
            permutations.push(entriesClone)
        } else if (entry.instruction === 'jmp') {
            entriesClone[index].instruction = 'nop'
            permutations.push(entriesClone)
        }
    })

    return permutations
}

export function runInstructions(array: Array<Entry>): Instruction {
    let counter = 0
    let currentPosition = 0
    let lastItem = false

    const instructions = {
        jmp: value => (currentPosition += value),
        acc: value => {
            counter += value
            currentPosition++
        },
        nop: () => currentPosition++
    }
    const positions = []

    const run = array => {
        if (currentPosition < array.length) {
            const { instruction, value, _, last } = array[currentPosition]
            positions.push(currentPosition)
            instructions[instruction](value)

            lastItem = last
            if (positions.indexOf(currentPosition) === -1) {
                run(array)
            }
        }
    }

    run(array)

    return { counter, last: lastItem }
}
