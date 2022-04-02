import { expect } from 'chai';
import RecipeCard from '../src/classes/RecipeCard';
const { recipeData } = require('../src/data/recipes');
const { ingredientsData } = require('../src/data/ingredients');


describe('Recipe Card', () => {
  let recipeCard;
    beforeEach(() => {
      recipeCard = new RecipeCard(recipeData[0])

    });

  it('Should be a function', () => {
    expect(RecipeCard).to.be.a('function');
  });

it('should create a recipe card', () => {

  expect(recipeCard.recipe).to.equal(recipeData[0])
})

it('should store the name of the recipe', () => {
  expect(recipeCard.name).to.equal(recipeData[0].name)
})

it('should store the list of ingredients', () => {
  expect(recipeCard.ingredients).to.equal(recipeData[0].ingredients)
})

it('should store the image', () => {
  expect(recipeCard.image).to.equal(recipeData[0].image)
})

it('should store the id of the recipe', () => {
  expect(recipeCard.id).to.equal(recipeData[0].id)
})

it('should store the tags of the recipe', () => {
  expect(recipeCard.tags).to.equal(recipeData[0].tags)
})

it('should determine the names of ingredients needed', () => {
  expect(recipeCard.getIngredients(ingredientsData)).to.includes('0.50 tsp salt')
})

it('should determine the cost of the ingredients', () => {
  expect(recipeCard.getCostOfIngredients(ingredientsData)).to.equal('$177.76')
})

it('should return the instructions', () => {
  expect(recipeCard.getInstructions()[0]).to.equal(recipeCard.instructions[0].instruction)
})

})
