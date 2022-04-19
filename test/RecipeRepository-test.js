import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import RecipeCard from '../src/classes/RecipeCard';

describe('Recipe Repository', () => {
  let recipeList;
  let recipeData;

    beforeEach(() => {
      recipeData = [{"id": 595736,
      "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      "ingredients": [
        {
          "id": 20081,
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          };
        };
      ],
      "instructions": [
        {
          "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
          "number": 1
        };
      ],
      "name": "Loaded Chocolate Chip Pudding Cookie Cups",
      "tags": [
        "antipasti",
      ];
    }];
      recipeList = new RecipeRepository(recipeData);
    });

    it('Should be a function', () => {
      expect(RecipeRepository).to.be.a('function');
    });

    it('should store all recipes', () => {
      expect(recipeList.recipes).to.equal(recipeData);
    });

    it('should find recipes by tag', () => {
      recipeList.getRecipesBySearch('antipasti');
      expect(recipeList.recipes).to.includes(recipeData[0]);
    });

    it('should find recipes by name', () => {
      recipeList.getRecipesBySearch("Cookie");
      expect(recipeList.recipes).to.includes(recipeData[0]);
    });


});
/// sad path for if a recipe isn't found?
