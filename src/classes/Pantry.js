export class Pantry {
  constructor(userPantry) {
    this.userPantry = userPantry;
    this.shoppingList = [];
  };

  // ingredient.id, ingredient.quantity.amount
  // stock.ingredient, stock.amount

  calculateShoppingList(ingredients) {
    ingredients.forEach(ingredient => {
      this.shoppingList.forEach(item => {
        this.userPantry.forEach(stock => {
          if(!this.shoppingList.includes(ingredient)){
            this.shoppingList.push(ingredient);
          } else if(ingredient === item) {
            item.quantity.amount += ingredient.quantity.amount
            this.shoppingList.push(ingredient);
          }
        });
      })
    });
  };

  removeItems() {
    this.userPantry.forEach(stock => {
      this.shoppingList.forEach(item => {
        if(item.id === stock.ingredient && item.quantity.amount <= stock.amount) {
          this.shoppingList.splice(this.shoppingList.indexOf(item), 1)
          stock.amount -= item.quantity.amount
        } else if(item.id === stock.ingredient && item.quantity.amount > stock.amount) {
          item.quantity.amount -= stock.amount
        }
      })
    })
  }

};

export default Pantry;
