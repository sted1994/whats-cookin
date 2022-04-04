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
      this.recipesToCook.push(recipe);
    };
  };

  addToFavRecipes(favRecipe) {
    if(!this.favRecipes.includes(favRecipe)) {
      this.favRecipes.push(favRecipe);
    };
  };

  removeFav(recipe) {
    const index = this.favRecipes.indexOf(recipe);
    this.favRecipes.splice(index, 1);
  };

  searchFavs(input) {
    const upperCaseInput = input[0].toUpperCase() + input.slice(1);
    const recipesByTag = this.favRecipes.reduce((arr, recipe) => {
       if(recipe.tags.includes(input)){
         arr.push(recipe);
       };
       return arr;
    }, []);
    const recipesByName = this.favRecipes.reduce((arr, recipe) => {
       if(recipe.name.includes(upperCaseInput)){
         arr.push(recipe);
       };
       return arr;
    }, []);

     const result = recipesByName.concat(recipesByTag).reduce((arr, recipe) => {
       if(!arr.includes(recipe)){
         arr.push(recipe);
       };
       return arr;
     },[]);
  return result;
  };
};

export default User;
