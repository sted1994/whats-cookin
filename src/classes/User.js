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
  //   if(this.favRecipes.includes(recipe)) {
  //     console.log("HELP");
  //   //  this.favRecipes.push(recipe)
  // } else {
  //   this.favRecipes.push(recipe)
  //
  // }
  if(this.favRecipes.length === 0) {
    this.favRecipes.push(favRecipe)
  } else {
  this.favRecipes.forEach((recipe) => {
    if(this.favRecipes.includes(favRecipe)) {
    } else {
    this.favRecipes.push(favRecipe)
  }
  })
}
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
          if(recipe.name.includes(input)) {
        this.filteredFavs.push(recipe)
      }
    })
    // console.log("KINGSLEY", recipesByTag[0]);
    // const recipesByName = this.favRecipes.filter((recipe) => {
      // let upperCaseInput = input[0].toUpperCase() + input.slice(1)
    //   return recipe[0].name.includes(upperCaseInput)
    // })
    //   const recipes = recipesByTag.map((recipe) => {
    //   recipesByName.map((recipe2) => {
    //     if(recipe.id === recipe2.id) {
    //       recipesByTag.splice([recipe], 2)
    //     }
    //   })
    // })
    //this.favRecipes = recipesByTag
    //.concat(recipesByName)
  }

};

export default User;
