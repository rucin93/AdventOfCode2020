import { getLinesFromFile } from '../utils'
import { parsePassports } from './passport'

const entries = getLinesFromFile(`${__dirname}/input.txt`, `\n\n`)
const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

const validPassports = parsePassports(entries, requiredKeys)

console.log(validPassports.length)
