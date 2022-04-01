export class RecipeRepository {
  constructor(recipes) {
    this.recipes = recipes;
  }

getRecipesBySearch(input) {
  const recipesByTag = this.recipes.filter((recipe) => {
    return recipe.tags.includes(input)
  })
  const recipesByName = this.recipes.filter((recipe) => {
    let upperCaseInput = input[0].toUpperCase() + input.slice(1)
    return recipe.name.includes(upperCaseInput)
  })
    const recipes = recipesByTag.map((recipe) => {
    recipesByName.map((recipe2) => {
      if(recipe.id === recipe2.id) {
        recipesByTag.splice([recipe], 2)
      }
    })
  })
  this.recipes = recipesByTag.concat(recipesByName)
}
}






export default RecipeRepository;
