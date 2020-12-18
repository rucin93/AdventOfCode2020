import { getLinesFromFile } from '../utils'
import { cycle, parseCubes } from './data'

const entries = getLinesFromFile(`${__dirname}/input.txt`)
const cycles = 6

let cubes = parseCubes(entries, 3)

for (let i = 0; i < cycles; i++) {
    cubes = cycle(cubes)
}

console.log(cubes.size)
