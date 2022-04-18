import { postIngredient } from '../scripts'
export class Pantry {
  constructor(userPantry) {
    this.userPantry = userPantry;
    this.shoppingList = [];
  };
  calculateShoppingList(ingredients) {
    if(!this.shoppingList[0]){
     ingredients.forEach(ingredient => {
       this.shoppingList.push(ingredient)
     });
    } else {
     this.shoppingList.forEach(item => {
       ingredients.forEach(ingredient => {
         if(item.id === ingredient.id){
           item.quantity.amount += ingredient.quantity.amount
         }
       })
     })
    }
    this.userPantry.forEach(stock => {
      this.shoppingList.forEach(item => {
        if(item.id === stock.ingredient && item.quantity.amount <= stock.amount) {
          this.shoppingList.splice(this.shoppingList.indexOf(item), 1)
        } else if(item.id === stock.ingredient && item.quantity.amount > stock.amount) {
          item.quantity.amount -= stock.amount
        }
      })
    })
  };

removeStockFromPantry(recipe, currentUserId) {
  this.userPantry.forEach(stock => {
    recipe.ingredients.forEach(ingredient => {
      if(stock.ingredient === ingredient.id) {
        stock.amount -= ingredient.quantity.amount
        postIngredient(currentUserId, stock.ingredient, ingredient.quantity.amount, 'subb')
      }
    })
  })
}

removeFromShoppingList(recipe){
  console.log(recipe.ingredients)
  recipe.ingredients.forEach(ingredient => {
    this.shoppingList.forEach(item => {
       if(item.id === ingredient.id){
         this.shoppingList.splice(this.shoppingList.indexOf(item))
       }
    })
  })
}

};

export default Pantry;
