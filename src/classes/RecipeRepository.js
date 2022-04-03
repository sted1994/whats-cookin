export class RecipeRepository {
  constructor(recipes) {
    this.recipes = recipes;
    this.filteredRecipes;
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

getRecipesBySearch(input) {
  const recipesByTag = this.recipes.filter((recipe) => {
    return recipe.tags.includes(input)
  })
  const recipesByName = this.recipes.filter((recipe) => {
    let upperCaseInput = input[0].toUpperCase() + input.slice(1)
    return recipe.name.includes(upperCaseInput)
  })
    recipesByTag.map((recipe) => {
      recipesByName.map((recipe2) => {
        if(recipe.id === recipe2.id) {
          recipesByName.splice([recipe], 1)
        }
      })
    })
  this.recipes = recipesByName.concat(recipesByTag)
}

  getAllRecipes(recipes) {
    this.recipes = recipes;
  }

}






export default RecipeRepository;
