class RecipeRepository {
  constructor(recipes) {
    this.recipes = recipes;
    this.recipesByTag;
  }

getRecipeByTag(tagName) {
  const recipesByTag = this.recipes.filter((recipe) => {
    return recipe.tags.includes(tagName)
  })
  this.recipesByTag = recipesByTag;
}

}

export default RecipeRepository;
