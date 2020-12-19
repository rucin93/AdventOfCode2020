export function count(rules, messages) {
    return messages.map(msg => checkMessage(rules, msg)).filter(msg => msg)
        .length
}

function checkSubRule(rules, msg, pattern, depth = 0) {
    let missed = [msg]
    for (const item of pattern) {
        if (Number.isInteger(item)) {
            missed = missed
                .map(msg => checkRule(rules, msg, item, depth + 1).missed)
                .flat()
        } else {
            missed = missed
                .filter(msg => msg[0] === item)
                .map(msg => msg.slice(1))
        }
        if (missed.length === 0) break
    }
    const match = missed.map(str => msg.slice(0, msg.length - str.length))

    return { match, missed }
}

function checkRule(rules, msg, ruleId, depth = 0) {
    let missed = []
    for (const subrule of rules[ruleId]) {
        const sub = checkSubRule(rules, msg, subrule, depth + 1)
        missed = [...missed, ...sub.missed]
    }
    const match = missed.map(str => msg.slice(0, msg.length - str.length))

    return { match, missed }
}

function checkMessage(rules, msg) {
    const { match, missed } = checkRule(rules, msg, 0)
    return match.length > 0 && match[0] === msg && missed[0].length === 0
}
