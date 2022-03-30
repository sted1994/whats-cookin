import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import RecipeCard from '../src/classes/RecipeCard';
const { recipeData } = require('../src/data/recipes');

describe('Recipe Repository', () => {
  let recipeList;
    beforeEach(() => {
      recipeList = new RecipeRepository(recipeData)
    });

    it('Should be a function', () => {
      expect(RecipeRepository).to.be.a('function');
    });

    it('should store all recipes', () => {
      expect(recipeList.recipes).to.equal(recipeData)
    })

    it('should find recipes by tag', () => {
      recipeList.getRecipeByTag('snack')
      expect(recipeList.recipesByTag).to.includes(recipeData[0])
    })

    it('should find recipes by name', () => {
      recipeList.getRecipeByName("Cookie")
      expect(recipeList.recipesByName).to.includes(recipeData[0])
    })

})
