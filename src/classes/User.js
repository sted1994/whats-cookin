export class User {
  constructor(userInfo) {
    this.userInfo = userInfo;
    this.recipesToCook = [];
    this.favRecipes = [];
    this.shoppingList = [];
    this.cost = 0;
    this.filteredFavs = [];
  };

  addToCookRecipes(recipe) {
    if(!this.recipesToCook.includes(recipe)) {
      this.recipesToCook.push(recipe)
    }
  };

  addToFavRecipes(favRecipe) {
    if(!this.favRecipes.includes(favRecipe))
      this.favRecipes.push(favRecipe)
  };

  removeFav(recipe) {
    const index = this.favRecipes.indexOf(recipe);
    this.favRecipes.splice(index, 1)
  };

  searchFavs(input) {
    const recipesByTag = this.favRecipes.forEach((recipe) => {
      if(recipe.tags.includes(input)) {
        this.filteredFavs.push(recipe)
      }
    })

    const recipesByName = this.favRecipes.forEach((recipe) => {
    let upperCaseInput = input[0].toUpperCase() + input.slice(1)
      if(recipe.name.includes(upperCaseInput)) {
        this.filteredFavs.push(recipe)
      }
    })
  }

};

export default User;
