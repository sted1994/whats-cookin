const domUpdates = {

  list: null,
  elements: null,
  pantry: null,
  recipe: null,

  displayElement(hide, show)  {
    hide.map((element) => {
      element.classList.add('hidden');
    });
  show.classList.remove('hidden');
  },

  makeList(recipe, method) {
    if(method === 'ingredient'){
      var list = recipe.getIngredients(domUpdates.list);
      var displayList = list.reduce((string, ingredient) => {
      string += `<li class="recipe-select-ingredient">${ingredient}</li>`;
      return string;
      }, " ");
      } else if(method === 'instructions'){
      var list = recipe.getInstructions();
      var displayList = list.reduce((string, instruction) => {
      string += `<li class="instruction">${instruction}</li>`;
      return string;
      }, " ");
    };
    return displayList;
  },

  showRecipes(recipeInfo, ingredients) {
    let renderer = " ";
      recipeInfo.recipes.map(recipe => {
      const ingredientList = domUpdates.makeList(recipe, "ingredient");
      renderer +=
      `<section class="recipe-select-box">
        <h1 class="recipe-select-name">${recipe.name}</h1>
        <div class="recipe-content-box">
          <img class="recipe-pic" src="${recipe.image}" alt="Recipe image">
          <ul class="recipe-select-ingredients">
            ${ingredientList}
          </ul>
        </div>
        <button onclick="domUpdates.displayElement(domUpdates.elements, domUpdates.elements[2]);domUpdates.formatRecipeCard(event.target.classList.value);" id="view-recipe-btn" class="${recipe.name}">View Recipe</button>
      </section>`;
    domUpdates.elements[4].innerHTML = renderer;
    });
  },

  formatRecipeCard(event) {
    let currentRecipe = assignCurrentRecipe(event)
    const ingredientList = domUpdates.makeList(currentRecipe, 'ingredient');
    const instructionList = domUpdates.makeList(currentRecipe, 'instructions');
    const price = currentRecipe.getCostOfIngredients(domUpdates.list);
    let renderer = "";
    const card =
    `<h1 class="recipe-title">${currentRecipe.name}</h1>
    <section class="recipe-card">
      <header>
        <p class="card-section-title">Ingredients:</p>
      </header>
      <article class="ingredients-section">
        <ul class="recipe-card-ingredients">
          ${ingredientList}
        </ul>
      </article>
      <section class="cost-info-section">
        <p class="recipe-cost">Ingredient Cost: ${price}</p>
      </section>
      <p class="card-section-title">Instructions:</p>
      <article class="instructions">
        <ol class="instructions-list">
          ${instructionList}
        </ol>
      </article>
      </section>
      <section class="save-buttons">
        <button onclick="saveRecipe(event.target.innerText);renderPantry(domUpdates.elements[5], domUpdates.pantry.userPantry);renderPantry(domUpdates.elements[6], domUpdates.pantry.shoppingList)"
        class="recipes-to-save-btn">Add To Saved Recipes</button>
        <button onclick="saveRecipe(event.target.innerText)"
        class="recipes-to-save-btn">Add To Favorites</button>
      </section>`;
    renderer = card;
    domUpdates.elements[2].innerHTML = renderer;
  },

  renderRecipes(recipes, location, string) {
    let stringify = JSON.stringify(string);
    location.innerHTML = '';
    recipes.map((recipe) => {
    location.innerHTML +=
    `<section class="saved-recipe-box">
       <p onclick="assignCurrentRecipe(event.target.innerText);formatRecipeCard(event.target.innerText);domUpdates.displayElement(domUpdates.elements, domUpdates.elements[2]);" class="list-item">${recipe.name}</p>
       <img onclick='deleteRecipe(event, ${stringify})' class="trashcan" src='images/delete.png'/>
     </section>`;
   });
  },

  renderPantry(location, list) {
    location.innerHTML = '';
    if (list === domUpdates.pantry.shoppingList) {
      domUpdates.pantry.shoppingList.map((item) => {
        console.log('THERE', domUpdates.pantry.shoppingList);
        domUpdates.list.forEach(ingredient => {
          if (item.id === ingredient.id) {
          //   domUpdates.pantry.userPantry.forEach(stock => {
          //     if (stock.ingredient === item.id) {
                location.innerHTML += `<li>${ingredient.name} - ${item.quantity.amount} units</li>`;
            //   }
            // })
            // location.innerHTML += `<li>${ingredient.name} - ${item.quantity.amount} units</li>`;
          };
        });
      });
    }
    list.map((item) => {
      domUpdates.list.forEach(ingredient => {
        if (item.ingredient === ingredient.id)
        location.innerHTML += `<li>${ingredient.name} - ${item.amount} units</li>`;
      });
    });
  }

}

window.domUpdates = domUpdates;

window.renderPantry = domUpdates.renderPantry;

window.renderShoppingList = domUpdates.renderShoppingList;

window.showRecipeCard = domUpdates.showRecipeCard;

window.formatRecipeCard = domUpdates.formatRecipeCard;

export { domUpdates };
