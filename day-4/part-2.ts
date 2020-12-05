import { getLinesFromFile } from '../utils'
import { parsePassports, validatePassport } from './passport'

const entries = getLinesFromFile(`${__dirname}/input.txt`, `\n\n`)
const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

const inRange = (min: number, value: number, max: number): boolean => {
    return value >= min && value <= max
}

const policies = {
    byr: value => inRange(1920, +value, 2002),
    iyr: value => inRange(2010, +value, 2020),
    eyr: value => inRange(2020, +value, 2030),
    hgt: value => {
        const [height, type] = value.split(/(cm|in)/)

        if (type === 'cm') {
            return inRange(150, +height, 193)
        } else if (type === 'in') {
            return inRange(59, +height, 76)
        }

        return false
    },
    hcl: value => value.match(/^#[0-9a-f]{6}$/),
    ecl: value => {
        return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)
    },
    pid: value => value.length === 9
}

const validPassports = parsePassports(entries, requiredKeys).filter(passport =>
    validatePassport(passport, policies)
)

console.log(validPassports.length)
