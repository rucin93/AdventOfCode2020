const createPassport = (data: string): object => {
    const entry = data
        .replace(/\n/g, ' ')
        .split(' ')
        .map(line => line.split(':'))

    return entry.reduce((result, [key, value]) => {
        result[key] = value
        return result
    }, {})
}

export function parsePassports(
    data: Array<string>,
    requiredKeys: Array<string>
): Array<object> {
    const passports = data.map(entry => createPassport(entry))
    return passports.filter(entry => requiredKeys.every(key => key in entry))
}

export function validatePassport(passport: object, rules: object): boolean {
    return Object.keys(rules).every(key => rules[key](passport[key]))
}
