export class Pantry {
  constructor(userPantry) {
    this.userPantry = userPantry;
    this.shoppingList = [];
  };

  //calculateShoppingList(ingredients) {
    //if(!this.shoppingList[0]){
    //  ingredients.forEach(ingredient => {
    //    this.shoppingList.push(ingredient)
    //  });
    //} else {
    //  this.shoppingList.forEach(item => {
    //    ingredients.forEach(ingredient => {
    //      if(item.id === ingredient.id){
    //        item.quantity.amount += ingredient.quantity.amount
    //      }
    //    })
    //  })
    //}
    //  this.shoppingList.forEach(item => {
    //    this.userPantry.forEach(stock => {
    //      if(stock.ingredient === item.id && item.quantity.amount < stock.amount){
    //         this.shoppingList.splice(this.shoppingList.indexOf(item), 1)
    //      } else if(stock.ingredient === item.id && item.quantity.amount > stock.amount){
    //        item.quantity.amount -= stock.amount
    //      }
    //    })
    //  })
    //};

export default Pantry;
