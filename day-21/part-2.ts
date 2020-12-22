import { getLinesFromFile } from '../utils'
import { isTrivial, parseAllergens, parseFood } from './allergens'
const entries = getLinesFromFile(`${__dirname}/input.txt`)

function unsafe(allergenList) {
    let found = []

    while (allergenList.filter(isTrivial).length) {
        const baseAllergens = allergenList.filter(isTrivial)
        const ingredients = baseAllergens.map(
            allergen => allergen.ingredients[0]
        )

        found = [].concat(found, baseAllergens)
        allergenList = allergenList
            .map(allergen => ({
                ...allergen,
                ingredients: allergen.ingredients.filter(
                    other => !ingredients.includes(other)
                )
            }))
            .filter(allergen => allergen.ingredients.length > 0)
    }

    return found
}

const foods = parseFood(entries)
const allergens = parseAllergens(foods)
const result = unsafe(allergens)
    .sort((a, b) => (a.name < b.name ? -1 : a.name < b.name ? 1 : 0))
    .map(allergen => allergen.ingredients[0])
    .join(',')

console.log(result)
