import { getLinesFromFile, add } from '../utils'
import { parseAllergens, parseFood, parseIngredients } from './allergens'

const entries = getLinesFromFile(`${__dirname}/input.txt`)

const foods = parseFood(entries)
const allergens = parseAllergens(foods)
const ingredients = parseIngredients(foods)

const safe = ingredients.filter(
    ingredient =>
        allergens.filter(allergen =>
            allergen.ingredients.includes(ingredient.name)
        ).length === 0
)
const res = safe.map(el => el.foods.length).reduce(add, 0)
console.log(res)
