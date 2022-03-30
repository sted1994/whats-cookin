export class RecipeRepository {
  constructor(recipes) {
    this.recipes = recipes;
  }

getRecipeByTag(tagName) {
  const recipesByTag = this.recipes.filter((recipe) => {
    return recipe.tags.includes(tagName)
  })
  this.recipesByTag = recipesByTag;
}

getRecipeByName(name) {
  const recipesByName = this.recipes.filter((recipe) => {
    return recipe.name.includes(name)
  })
  this.recipesByName = recipesByName;
}

}

export default RecipeRepository;
