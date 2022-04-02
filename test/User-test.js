import { expect } from 'chai';
import RecipeCard from '../src/classes/RecipeCard';
const { recipeData } = require('../src/data/recipes');
import User from '../src/classes/User';
const { userData } = require('../src/data/users');

describe("User", () => {

  let user;
  let recipe;

    beforeEach(() => {
      user = new User;
      recipe = new RecipeCard(recipeData[0])
    });

  it("should be a function", () => {
    expect(User).to.be.a("function")
  });

  it("should be able to store multiple recipes to cook", () => {
    user.addToCookRecipes(recipe)
    let recipe2 = new RecipeCard(recipeData[1])
    user.addToCookRecipes(recipe2)
    expect(user.recipesToCook).to.include(recipe)
    expect(user.recipesToCook).to.include(recipe2)
  });

  it("should be able to store multiple recipes to favorites", () => {
    user.addToFavRecipes(recipe)
    let recipe2 = new RecipeCard(recipeData[1])
    user.addToFavRecipes(recipe2)
    expect(user.favRecipes).to.include(recipe)
    expect(user.favRecipes).to.include(recipe2)
  });

  it("should be able to remove favorite recipes", () => {
    user.addToFavRecipes(recipe);
    let recipe2 = new RecipeCard(recipeData[1])
    user.addToFavRecipes(recipe2)
    user.removeFav(recipe2)
    expect(user.favRecipes[0]).to.equal(recipe)
  });

});
