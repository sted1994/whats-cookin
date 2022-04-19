import { expect } from 'chai';
import Pantry from '../src/classes/Pantry';

describe('Pantry', () => {

  let pantry;
  let recipeIngredients =
  {ingredients: [
    {
      "id": 20081,
      "quantity": {
        "amount": 10,
        "unit": "c"
      }
    },
    {
      "id": 11457,
      "quantity": {
        "amount": 10,
        "unit": "c"
      };
    };

  ];
};

  let userOne = {
    id: 1,
    name: "Saige O'Kon",
    pantry: [
      {ingredient: 11297, amount: 4},
      {ingredient: 1082047, amount: 10},
      {ingredient: 20081, amount: 10},
      {ingredient: 11215, amount: 5},
      {ingredient: 2047, amount: 6},
      {ingredient: 1123, amount: 8},
      {ingredient: 11282, amount: 4},
      {ingredient: 6172, amount: 2},
      {ingredient: 2044, amount: 2},
      {ingredient: 2050, amount: 4},
      {ingredient: 1032009, amount: 3},
      {ingredient: 5114, amount: 3},
      {ingredient: 1017, amount: 2},
      {ingredient: 18371, amount: 7},
      {ingredient: 1001, amount: 6},
      {ingredient: 99223, amount: 2},
      {ingredient: 1230, amount: 2},
      {ingredient: 9152, amount: 4},
      {ingredient: 10611282, amount: 2},
      {ingredient: 93607, amount: 2},
      {ingredient: 14106, amount: 4},
      {ingredient: 1077, amount: 4},
      {ingredient: 6150, amount: 2},
      {ingredient: 1124, amount: 2},
      {ingredient: 10011693, amount: 4},
      {ingredient: 1102047, amount: 2},
      {ingredient: 19206, amount: 2},
      {ingredient: 1145, amount: 4},
      {ingredient: 1002030, amount: 4},
      {ingredient: 12061, amount: 2},
      {ingredient: 19335, amount: 4},
      {ingredient: 15152, amount: 3},
      {ingredient: 9003, amount: 2},
      {ingredient: 18372, amount: 3},
      {ingredient: 2027, amount: 2}
]};

    beforeEach(() => {
      pantry = new Pantry(userOne.pantry);
    });

  it("it should be a function", () => {
    expect(Pantry).to.be.a("function")
  });

  it("should store a user's pantry", () => {
    expect(pantry.userPantry).to.equal(userOne.pantry)
  });

  it("should create a shopping list", () => {
    pantry.calculateShoppingList(recipeIngredients.ingredients)
    expect(pantry.shoppingList[0]).to.deep.equal({
      id: 11457,
      quantity: {
        amount: 10,
        unit: "c"
      };
    });
  });

  it("should be able to add ingredients not in pantry to the shopping list", () => {
    pantry.calculateShoppingList(recipeIngredients.ingredients);
    expect(pantry.shoppingList[pantry.shoppingList.length - 1].id).to.equal (recipeIngredients.ingredients[1].id);
  });

  it("should be able to say if a user's pantry has enough ingredients to cook a given meal", () => {
    recipeIngredients.ingredients[1].id = 1082047;
    pantry.calculateShoppingList(recipeIngredients.ingredients);
    expect(pantry.shoppingList.length).to.equal(0);
  });

  it("should be able to remove stock from Pantry", () => {
    pantry.removeStockFromPantry(recipeIngredients);
    expect(pantry.userPantry[2].amount).to.equal(0);
  });

  it("should be able to determine the amount of an ingredient still needed to cook a given meal", () => {
    recipeIngredients.ingredients[1].id = 11457;
    pantry.userPantry[2].amount = 10;
    recipeIngredients.ingredients[0].quantity.amount = 15;
    pantry.calculateShoppingList(recipeIngredients.ingredients);
    expect(pantry.shoppingList[0].quantity.amount).to.equal(5);
  });

});
