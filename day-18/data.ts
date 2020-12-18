export function solve(exp: string, evaluate: (string) => number) {
    const expressionStart = exp.lastIndexOf('(')
    const expressionEnd = exp.indexOf(')', expressionStart)

    if (expressionStart === -1) {
        return evaluate(exp)
    } else {
        const leftPart = exp.slice(0, expressionStart)
        const rightPart = exp.slice(expressionEnd + 1)
        const inside = exp.slice(expressionStart + 1, expressionEnd)

        return solve(`${leftPart}${evaluate(inside)}${rightPart}`, evaluate)
    }
}
