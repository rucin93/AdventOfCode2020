import {getLinesFromFile} from '../utils'

const entries = getLinesFromFile(`${__dirname}/input.txt`, `

`)
let counter = 0

const checkValidity = data => {
    if ((data.byr > 1919) && (data.byr < 2003)) {
        if ((data.iyr > 2009) && (data.iyr < 2021)) {
            if ((data.eyr > 2019) && (data.eyr < 2031)) {
                const [height, type] = data.hgt.split(/(cm|in)/)
                if (((type == 'cm') && (height > 149) && (height < 194)) || ((type == 'in') && (height > 55) && (height < 76))) {
                    if ((data.hcl[0] === '#') && (data.hcl.replace(/[^0-9a-f]/g, '').length === 6)) {
                        if (['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(data.ecl) !== -1) {
                            if (data.pid.length === 9) {
                                return true
                            }
                        }
                    }
                }
            }
        }
    }

    return false
}

entries.forEach(entry => {
    const data = {}
    entry.replace(/\n/g, ' ').split(' ').forEach(item => {
        const [key, val] = item.split(':')
        data[key] = val
    })

    if (Object.keys(data).length > (data['cid'] ? 7 : 6)) {
        if (checkValidity(data)) {
            counter++
        }
    }

})

console.log(counter)