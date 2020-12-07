export function parseEntries(entries: Array<string>): object {
    return entries.reduce((bags, line) => {
        const matchBag = line.match(/(^|\d+ ).*? bag/g)
        const [bag, ...innerBags] = matchBag.map(data =>
            data.replace(/ bag/g, '')
        )

        bags[bag] = innerBags.map(innerData => {
            const data = innerData.match(/(?<quantity>\d+) (?<color>.*)/).groups

            return {
                color: data.color,
                quantity: parseInt(data.quantity)
            }
        })
        return bags
    }, {})
}
