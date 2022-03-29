import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import RecipeCard from '../src/classes/RecipeCard';
const { recipeData } = require('../src/data/recipes');

describe('Recipe Card', () => {
  let recipeList;
  let recipeCard;
    beforeEach(() => {
      recipeList = new RecipeRepository(recipeData[0]);
      recipeCard = new RecipeCard(recipeData[0])

    });

  it('Should be a function', () => {
    //console.log(recipeCard)
    expect(RecipeCard).to.be.a('function');
  });

it('should create a recipe card', () => {

  expect(recipeCard.recipe).to.equal(recipeData[0])
})

it('should store the name of the recipe', () => {
  //console.log(recipeData[0].name)
  expect(recipeCard.name).to.equal(recipeData[0].name)
})

it('should store the list of ingredients', () => {
  //console.log(recipeData[0].ingredients)
  expect(recipeCard.ingredients).to.equal(recipeData[0].ingredients)
})

it('should store the image', () => {
  //console.log(recipeData[0].image)
  expect(recipeCard.image).to.equal(recipeData[0].image)
})

it('should store the id of the recipe', () => {
  //console.log(recipeData[0].id)
  expect(recipeCard.id).to.equal(recipeData[0].id)
})

it('should store the tags of the recipe', () => {
  //console.log(recipeData[0].tags)
  expect(recipeCard.tags).to.equal(recipeData[0].tags)
})

})
