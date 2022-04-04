import { expect } from 'chai';
import RecipeCard from '../src/classes/RecipeCard';

describe('Recipe Card', () => {
  let recipeCard;
  let ingredients;
  let recipeData;


    beforeEach(() => {
        recipeData = {"id": 595736,
        "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
        "ingredients": [
          {
            "id": 20081,
            "quantity": {
              "amount": 1.5,
              "unit": "c"
            }
          }
        ],
        "instructions": [
          {
            "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
            "number": 1
          }
        ],
        "name": "Loaded Chocolate Chip Pudding Cookie Cups",
        "tags": [
          "antipasti",
        ]
      }
      ingredients = [{
        "id": 20081,
        "name": "wheat flour",
        "estimatedCostInCents": 142
      }]
      recipeCard = new RecipeCard(recipeData)
    });

  it('Should be a function', () => {
    expect(RecipeCard).to.be.a('function');
  });

it('should create a recipe card', () => {

  expect(recipeCard).to.be.instanceof(RecipeCard)
})

it('should store the name of the recipe', () => {
  expect(recipeCard.name).to.equal(recipeData.name)
})

it('should store the list of ingredients', () => {
  expect(recipeCard.ingredients).to.equal(recipeData.ingredients)
})

it('should store the image', () => {
  expect(recipeCard.image).to.equal(recipeData.image)
})

it('should store the id of the recipe', () => {
  expect(recipeCard.id).to.equal(recipeData.id)
})

it('should store the tags of the recipe', () => {
  expect(recipeCard.tags).to.equal(recipeData.tags)
})

it('should determine the names of ingredients needed', () => {
  expect(recipeCard.getIngredients(ingredients)).to.deep.equal(['1.50 c wheat flour'])
})

it('should determine the cost of the ingredients', () => {
  expect(recipeCard.getCostOfIngredients(ingredients)).to.equal('$2.13')
})

it('should return the instructions', () => {
  expect(recipeCard.getInstructions()[0]).to.equal(recipeCard.instructions[0].instruction)
})

})
