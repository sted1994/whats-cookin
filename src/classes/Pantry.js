export class Pantry {
  constructor(userPantry) {
    this.userPantry = userPantry;
    this.shoppingList = [];
  };

  // calculateShoppingList(ingredients) {
  //   ingredients.forEach(ingredient => {
  //     this.userPantry.forEach(stock => {
  //       if (!this.shoppingList.includes(ingredient)) {
  //         if (!this.userPantry.includes(ingredient)) {
  //
  //           // ingredient.quantity.amount = ingredient.quantity.amount - stock.amount;
  //           this.shoppingList.push(ingredient);
  //         } else if (ingredient.quantity.amount > stock.amount && ingredient.id === stock.ingredient){
  //           this.shoppingList.push(ingredient);
  //         }
  //       }
  //     });
  //   });
  //
  // };
};

export default Pantry;
