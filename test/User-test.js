import { expect } from 'chai';
import RecipeCard from '../src/classes/RecipeCard';
//const { recipeData } = require('../src/data/recipes');
import User from '../src/classes/User';
//const { userData } = require('../src/data/users');

describe("User", () => {

  let user;
  let recipe;
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
      ]},
      {
        "id": 678353,
        "image": "https://spoonacular.com/recipeImages/678353-556x370.jpg",
        "ingredients": [
          {
            "id": 1009016,
            "quantity": {
              "amount": 1.5,
              "unit": "cups"
            }
          }
        ],
            "instructions": [
              {
                "instruction": "Season the pork chops with salt and pepper and grill or pan fry over medium high heat until cooked, about 3-5 minutes per side. (If grilling, baste the chops in the maple dijon apple cider sauce as you grill.)Meanwhile, mix the remaining ingredients except the apple slices, bring to a simmer and cook until the sauce thickens, about 2-5 minutes.Grill or saute the apple slices until just tender but still crisp.Toss the pork chops and apple slices in the maple dijon apple cider sauce and enjoy!",
                "number": 1
              }
            ],
            "name": "Maple Dijon Apple Cider Grilled Pork Chops",
            "tags": [
              "lunch",
            ]
    }]

      user = new User;
      recipe = new RecipeCard(recipeData)
    });

  it("should be a function", () => {
    expect(User).to.be.a("function");
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
