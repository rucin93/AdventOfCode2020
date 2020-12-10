export function findInvalidNumber(
    numbers: Array<number>,
    preambleLength: number
): number {
    for (let i = 0; i < numbers.length; i++) {
        let currentWorkingRange = numbers.slice(i, preambleLength + 1 + i)
        const workingSet = new Set(numbers.slice(i, preambleLength + i))
        const finalSum = currentWorkingRange.pop()

        for (let j = 0; j < workingSet.size; j++) {
            const addendPartner = finalSum - currentWorkingRange[j]

            if (workingSet.has(addendPartner)) {
                break
            }

            if (j === currentWorkingRange.length - 1) {
                return finalSum
            }
        }
    }
}
