import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import './images/chicken.png';
import './images/beef.png';
import './images/left-arrow.png';
import './images/magnifying-glass.png';
import './images/pork.png';
import './images/right-arrow.png';
import './images/thyme.png';
import './images/vegitarian.png';
import './images/delete.png'
import { ingredientsData } from './data/ingredients';
import './data/recipes';
import './data/users';
import { RecipeCard } from './classes/RecipeCard';
import { RecipeRepository } from './classes/RecipeRepository';
import { User } from './classes/User'
import { recipeData } from './data/recipes'
import { usersData } from './data/users'

let newRecipeRepository = new RecipeRepository(recipeData);
let currentUser;
let currentRecipe;

const mainPage = document.querySelector('.main')
const allRecipesTab = document.querySelector('.all-recipes')
const recipeSelectionPage = document.querySelector('.recipe-selection')
const searchInput = document.getElementById("search-input")
const magButton = document.querySelector(".mag-btn")
const recipeCardPage = document.querySelector('.display-recipe')
const recipeCardTitle = document.querySelector('.recipe-title')
const myRecipes = document.querySelector('.my-recipes')
const toCookBox = document.getElementById('recipes-to-cook')
const favRecipes = document.getElementById('fav-recipes')
const shoppingList = document.querySelector('.shopping-list-page')
const homeTab = document.querySelector('.home')
const myRecipesTab = document.querySelector('.saved-recipes')
const shoppingTab = document.querySelector('.shopping-list')
const toCook = document.querySelector('.recipes-to-cook-list')
const favorites = document.querySelector('.favorite-recipes-list')



document.addEventListener('keypress', function(event) {
  if(event.key === "Enter"){
    const newRecipeRepository = new RecipeRepository(recipeData);
    newRecipeRepository.getRecipesBySearch(searchInput.value)
    hideElement(mainPage)
    hideElement(myRecipes)
    hideElement(recipeCardPage)
    hideElement(shoppingList)
    showElement(recipeSelectionPage)
    showRecipes(newRecipeRepository)
  }
})

window.addEventListener('load', function() {
  let randomUser = getRandomUser(usersData);
  currentUser = new User(randomUser)
})

homeTab.addEventListener('click', function() {
  hideElement(recipeSelectionPage)
  hideElement(myRecipes)
  hideElement(recipeCardPage)
  hideElement(shoppingList)
  showElement(mainPage)
})

myRecipesTab.addEventListener('click', function() {
  hideElement(recipeSelectionPage)
  hideElement(mainPage)
  hideElement(recipeCardPage)
  hideElement(shoppingList)
  showElement(myRecipes)
})

shoppingTab.addEventListener('click', function() {
  hideElement(recipeSelectionPage)
  hideElement(mainPage)
  hideElement(recipeCardPage)
  hideElement(myRecipes)
  showElement(shoppingList)
})

allRecipesTab.addEventListener('click', function(){
  hideElement(mainPage)
  hideElement(myRecipes)
  hideElement(recipeCardPage)
  hideElement(shoppingList)
  showElement(recipeSelectionPage)
  showRecipes(newRecipeRepository)
})

magButton.addEventListener('click', function() {
  newRecipeRepository.getRecipesBySearch(searchInput.value)
  hideElement(mainPage)
  hideElement(myRecipes)
  hideElement(recipeCardPage)
  hideElement(shoppingList)
  showElement(recipeSelectionPage)
  showRecipes(newRecipeRepository)
})



const showElement = (element) => {
  element.classList.remove('hidden')
}

const hideElement = (element) => {
  element.classList.add('hidden')
}

function getRandomUser(user) {
  return user[Math.floor(Math.random() * user.length)];
}

const showRecipeCard = (event) => {
  hideElement(recipeSelectionPage)
  hideElement(mainPage)
  hideElement(myRecipes)
  hideElement(shoppingList)
  showElement(recipeCardPage)
  currentRecipe = newRecipeRepository.recipes.filter(recipe => recipe.name === event)
  formatRecipeCard(currentRecipe)
}
window.showRecipeCard = showRecipeCard;

const saveRecipe = (event) => {
  if(event === 'Add To Saved Recipes') {
    currentUser.addToCookRecipes(currentRecipe)
  } else if(event === 'Add To Favorites') {
    currentUser.addToFavRecipes(currentRecipe)
  }
  renderRecipesToCook()
  renderFavRecipes()
}
window.saveRecipe = saveRecipe;

const deleteFavorite = (event) => {
  const newFavorites = currentUser.favRecipes.filter((recipe) => {
    return recipe[0].name !== event.target.parentElement.innerText
  })
  currentUser.favRecipes = newFavorites;
  renderFavRecipes()
}
window.deleteFavorite = deleteFavorite;


const makeList = (recipe, method) => {
  const newRecipeCard = new RecipeCard(recipe);;
  if(method === 'ingredient'){
    var list = newRecipeCard.getIngredients(ingredientsData)
    var displayList = list.reduce((string, ingredient) => {
    string += `<li class="recipe-select-ingredient">${ingredient}</li>`
    return string;
    }, " ");
    } else if(method === 'instructions'){
    var list = newRecipeCard.getInstructions(ingredientsData)
    var displayList = list.reduce((string, instruction) => {
    string += `<li class="instruction">${instruction}</li>`
    return string;
    }, " ");
}
    return displayList
}

const showRecipes = (recipeInfo) => {
  let renderer = " ";
    recipeInfo.recipes.map(recipe => {
    const ingredientList = makeList(recipe, "ingredient")
    renderer +=
    `<section class="recipe-select-box">
       <h1 class="recipe-select-name">${recipe.name}</h1>
       <div class="recipe-content-box">
         <img class="recipe-pic" src="${recipe.image}" alt="Spaghetti">
         <ul class="recipe-select-ingredients">
          ${ingredientList}
         </ul>
       </div>
       <button onclick="showRecipeCard(event.target.classList.value)" class="${recipe.name}">test</button>
     </section>`
    recipeSelectionPage.innerHTML = renderer;
  });
}

const formatRecipeCard = (currentRecipe) => {
  const newRecipe = new RecipeCard(currentRecipe[0])
  const ingredientList = makeList(currentRecipe[0], 'ingredient')
  const instructionList = makeList(currentRecipe[0], 'instructions')
  const price = newRecipe.getCostOfIngredients(ingredientsData)
  let renderer = "";
  const card =
  `<h1 class="recipe-title">${currentRecipe[0].name}</h1>
  <section class="recipe-card">
    <header>
      <p class="ingredient">Ingredients:</p>
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
    <p class="instructions-title">Instuctions:</p>
    <article class="instructions">
      <ol class="instructions-list">
        ${instructionList}
      </ol>
    </article>
    </section>
    <section>
      <button onclick="saveRecipe(event.target.innerText)"
      class="recipes-to-cook-btn">Add To Saved Recipes</button>
      <button onclick="saveRecipe(event.target.innerText)"
      class="recipes-to-fav-btn">Add To Favorites</button>
    </section>`
  renderer = card;
  recipeCardPage.innerHTML = renderer;
}

 const renderRecipesToCook = () => {
   toCook.innerHTML = '';
   currentUser.recipesToCook.map((recipe) => {
   toCook.innerHTML += `<li class="list-item">${recipe[0].name}</li>`;
   })
 }

 const renderFavRecipes = () => {
   favorites.innerHTML = '';
   currentUser.favRecipes.map((recipe) => {
   favorites.innerHTML +=
   `<li class="list-item">${recipe[0].name}<img onclick='deleteFavorite(event)' class="trashcan" src='images/delete.png'/></li>`
 })
}
