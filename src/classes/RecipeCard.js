class RecipeCard {
  constructor(recipe) {
    this.recipe = recipe;
    this.name = recipe.name;
    this.ingredients = recipe.ingredients;
    this.image = recipe.image;
    this.id = recipe.id;
    this.tags = recipe.tags;

  }


}

export default RecipeCard;
