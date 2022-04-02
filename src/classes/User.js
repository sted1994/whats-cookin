export class User {
  constructor(userInfo) {
    this.userInfo = userInfo;
    this.recipesToCook = [];
    this.favRecipes = [];
    this.shoppingList = [];
    this.cost = 0;
  };

  addToCookRecipes(recipe) {
    if(!this.recipesToCook.includes(recipe)) {
      this.recipesToCook.push(recipe)
    }
  };

  addToFavRecipes(recipe) {
    if(!this.favRecipes.includes(recipe)) {
      this.favRecipes.push(recipe)
    }
  };

  removeFav(recipe) {
    const index = this.favRecipes.indexOf(recipe);
    this.favRecipes.splice(index, 1)
  };

};

export default User;
