export class RecipeCard {
  constructor(recipe) {
    this.recipe = recipe;
    this.name = recipe.name;
    this.ingredients = recipe.ingredients;
    this.image = recipe.image;
    this.id = recipe.id;
    this.tags = recipe.tags;
    this.instructions = recipe.instructions;

  }

getIngredients(ingredients) {
  const ingredientList = this.ingredients.reduce((arr, ingredient) => {
    const items = ingredients.forEach(item => {
      if(ingredient.id === item.id) {
        arr.push(item.name)
      }
    })
    return arr
  }, [])
  return ingredientList
};

getCostOfIngredients(ingredients) {
  const ingredientList = this.ingredients.reduce((num, ingredient) => {
    const items = ingredients.forEach(item => {
      if(ingredient.id === item.id) {
        num += (item.estimatedCostInCents * ingredient.quantity.amount)
      }
    })
    return num
  }, 0)
  return `$${ingredientList/100}`
};

getInstructions() {
  const instructionList = this.instructions.reduce((arr, instructions) => {
    const items = instructions.instruction
    arr.push(items)
    return arr
  }, [])
  return instructionList
};
  


};

export default RecipeCard;
