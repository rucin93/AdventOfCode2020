import { getLinesFromFile } from '../utils'
import {
    parseEntries,
    createPermutations,
    runInstructions
} from './instructions'

const entries = parseEntries(getLinesFromFile(`${__dirname}/input.txt`))

createPermutations(entries).forEach(entry => {
    const { counter, last } = runInstructions(entry)

    if (last) {
        console.log(counter)
    }
})
