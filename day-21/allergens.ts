interface Food {
    allergens: string[]
    ingredients: string[]
}

interface Allergen {
    name: string
    ingredients: string[]
}

export function intersection(setsArray: Set<string>[]) {
    return setsArray.reduce((a, b) => new Set([...a].filter(x => b.has(x))))
}

export function getIngredients(foods: Food[], allergen: string): string[] {
    const allergenFoods = foods.filter(food =>
        food.allergens.includes(allergen)
    )
    const foodIngredients = allergenFoods.map(food => new Set(food.ingredients))
    return Array.from(intersection(foodIngredients))
}

export function parseFood(entries: string[]): Food[] {
    return entries
        .filter(line => line.length > 0)
        .map(line => ({
            ingredients: line.split(' (')[0].split(' '),
            allergens: line.split(' (')[1].slice(9, -1).split(', ')
        }))
}

export function parseAllergens(foods: Food[]): Allergen[] {
    return Array.from(new Set(foods.map(food => food.allergens).flat())).map(
        allergen => ({
            name: allergen,
            ingredients: getIngredients(foods, allergen)
        })
    )
}

export function parseIngredients(foods: Food[]) {
    return [...new Set(foods.map(food => food.ingredients).flat())].map(
        ingredient => ({
            name: ingredient,
            foods: foods
                .map((food, i) => ({ ...food, index: i }))
                .filter(food => food.ingredients.includes(ingredient))
                .map(food => food.index)
        })
    )
}

export function isTrivial(allergen: Allergen): boolean {
    return allergen.ingredients.length === 1
}
