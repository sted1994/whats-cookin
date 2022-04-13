import './scripts.js'

const mainPage = document.querySelector('.main');
const allRecipesTab = document.querySelector('.all-recipes');
const recipeSelectionPage = document.querySelector('.recipe-selection');
const searchInput = document.getElementById("search-input");
const magButton = document.querySelector(".mag-btn");
const recipeCardPage = document.querySelector('.display-recipe');
//const recipeCardTitle = document.querySelector('.recipe-title');
const myRecipes = document.querySelector('.my-recipes');
const toCookBox = document.getElementById('recipes-to-cook');
const favRecipes = document.getElementById('fav-recipes');
const shoppingList = document.querySelector('.shopping-list-page');
const homeTab = document.querySelector('.home');
const myRecipesTab = document.querySelector('.saved-recipes');
const shoppingTab = document.querySelector('.shopping-list');
const toCook = document.querySelector('.recipes-to-cook-list');
const favorites = document.querySelector('.favorite-recipes-list');
const favSearch = document.getElementById("recipe-search-input");
const clearFilterBtn = document.querySelector('.clear-filter-Btn');
//let currentRecipe;


const domUpdates = {

 displayElement(hide, show)  {
  hide.map((element) => {
    element.classList.add('hidden');
  });
  show.classList.remove('hidden');
},

showRecipeCard(currentRecipe) {
  domUpdates.displayElement([mainPage, myRecipes, recipeCardPage, shoppingList, recipeSelectionPage], recipeCardPage);
  //assignCurrentRecipe(event);
  domUpdates.formatRecipeCard(currentRecipe);
},

 showRecipes(recipeInfo) {
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
       <button onclick="showRecipeCard(event.target.classList.value)" id="view-recipe-btn" class="${recipe.name}">View Recipe</button>

     </section>`;
    recipeSelectionPage.innerHTML = renderer;
  });
},



formatRecipeCard(currentRecipe) {
  const ingredientList = domUpdates.makeList(currentRecipe, 'ingredient');
  const instructionList = domUpdates.makeList(currentRecipe, 'instructions');
  const price = currentRecipe.getCostOfIngredients(ingredients);
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
      <button class="add-ingredients-btn">Add To Shopping List!</button>
    </section>
    <p class="card-section-title">Instructions:</p>
    <article class="instructions">
      <ol class="instructions-list">
        ${instructionList}
      </ol>
    </article>
    </section>
    <section class="save-buttons">
      <button onclick="saveRecipe(event.target.innerText)"
      class="recipes-to-save-btn">Add To Saved Recipes</button>
      <button onclick="saveRecipe(event.target.innerText)"
      class="recipes-to-save-btn">Add To Favorites</button>
    </section>`;
  renderer = card;
  recipeCardPage.innerHTML = renderer;
},

renderRecipes(recipes, location, string) {
  let stringify = JSON.stringify(string);
  location.innerHTML = '';
  recipes.map((recipe) => {
  location.innerHTML +=
  `<section class="saved-recipe-box">
     <p onclick="showRecipeCard(event.target.innerText);   assignCurrentRecipe(event);" class="list-item">${recipe.name}</p>
     <img onclick='deleteRecipe(event, ${stringify})' class="trashcan" src='images/delete.png'/>
   </section>`;
 });
},
};
export { domUpdates };
