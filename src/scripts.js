import './styles.css';
import apiCalls from './apiCalls';
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
import { RecipeCard } from './classes/RecipeCard';
import { RecipeRepository } from './classes/RecipeRepository';
import { User } from './classes/User'
import { data } from './apiCalls'

let newRecipeRepository;
let currentUser;
let currentRecipe;
let ingredients;
let usersData;
let recipeDataClasses

const promise = Promise.all([data.recipes, data.ingredients, data.users]).then(results => {
   ingredients = results[1].ingredientsData;
   usersData = results[2].usersData
   recipeDataClasses = results[0].recipeData.map((recipe) => {
   return new RecipeCard(recipe);
   })
   newRecipeRepository = new RecipeRepository(recipeDataClasses);
}).then(randomUser => getRandomUser())

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
const favSearch = document.getElementById("recipe-search-input")
const clearFilterBtn = document.querySelector('.clear-filter-Btn')

document.addEventListener('keypress', function(event) {
  if(event.key === "Enter" && searchInput.value){
    newRecipeRepository.getRecipesBySearch(searchInput.value)
    displayElement([mainPage, myRecipes, recipeCardPage, shoppingList, recipeSelectionPage], recipeSelectionPage)
    showRecipes(newRecipeRepository)
    newRecipeRepository.getAllRecipes(recipeDataClasses)
    searchInput.value = ""
  } else if(event.key === "Enter") {
    renderRecipes(currentUser.searchFavs(favSearch.value), favorites, "favRecipes")
    favSearch.value = ""
  }
})

homeTab.addEventListener('click', function() {
  displayElement([mainPage, myRecipes, recipeCardPage, shoppingList, recipeSelectionPage], mainPage)
})

myRecipesTab.addEventListener('click', function() {
  displayElement([mainPage, myRecipes, recipeCardPage, shoppingList, recipeSelectionPage], myRecipes)
})

shoppingTab.addEventListener('click', function() {
  displayElement([mainPage, myRecipes, recipeCardPage, shoppingList, recipeSelectionPage], shoppingList)
})

allRecipesTab.addEventListener('click', function(){
  newRecipeRepository.getAllRecipes(recipeDataClasses)
  displayElement([mainPage, myRecipes, recipeCardPage, shoppingList, recipeSelectionPage], recipeSelectionPage)
  showRecipes(newRecipeRepository)
})

magButton.addEventListener('click', function() {
  newRecipeRepository.getRecipesBySearch(searchInput.value)
  displayElement([mainPage, myRecipes, recipeCardPage, shoppingList, recipeSelectionPage], recipeSelectionPage)
  showRecipes(newRecipeRepository)
  newRecipeRepository.getAllRecipes(recipeDataClasses)
  searchInput.value = ""
})

clearFilterBtn.addEventListener('click', function(){
  renderRecipes(currentUser.favRecipes, favorites, "favRecipes")
})

const displayElement = (hide, show) => {
  hide.map((element) => {
    element.classList.add('hidden')
  })
  show.classList.remove('hidden')
}

function getRandomUser(data) {
  let user = usersData[Math.floor(Math.random() * usersData.length)];
  currentUser = new User(user)
}

const showRecipeCard = (event) => {
  displayElement([mainPage, myRecipes, recipeCardPage, shoppingList, recipeSelectionPage], recipeCardPage)
  newRecipeRepository.recipes.forEach(recipe => {
    if(recipe.name === event) {
      currentRecipe = recipe
    }
  })
  formatRecipeCard(currentRecipe)
}
window.showRecipeCard = showRecipeCard;

const saveRecipe = (event) => {
  if(event === 'Add To Saved Recipes') {
    currentUser.addToCookRecipes(currentRecipe)
  } else if(event === 'Add To Favorites') {
    currentUser.addToFavRecipes(currentRecipe)
  }
  renderRecipes(currentUser.recipesToCook, toCook, "recipesToCook")
  renderRecipes(currentUser.favRecipes, favorites, "favRecipes")
}
window.saveRecipe = saveRecipe;

const deleteRecipe = (event, recipes) => {
  if(recipes === "recipesToCook") {
    let recipesToCook = currentUser.recipesToCook.filter((recipe) => {
      return recipe.name !== event.target.parentElement.innerText
    })
    currentUser.recipesToCook = recipesToCook
    renderRecipes(currentUser.recipesToCook, toCook, "recipesToCook")
  } else {
    var favRecipes = currentUser.favRecipes.filter((recipe) => {
      return recipe.name !== event.target.parentElement.innerText
    })
  currentUser.favRecipes = favRecipes
    renderRecipes(currentUser.favRecipes, favorites, "favRecipes")
  }
}
window.deleteRecipe = deleteRecipe;

const makeList = (recipe, method) => {;
  if(method === 'ingredient'){
    var list = recipe.getIngredients(ingredients)
    var displayList = list.reduce((string, ingredient) => {
    string += `<li class="recipe-select-ingredient">${ingredient}</li>`
    return string;
    }, " ");
    } else if(method === 'instructions'){
    var list = recipe.getInstructions(ingredients)
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
         <img class="recipe-pic" src="${recipe.image}" alt="Recipe image">
         <ul class="recipe-select-ingredients">
          ${ingredientList}
         </ul>
       </div>
       <button onclick="showRecipeCard(event.target.classList.value)" id="view-recipe-btn" class="${recipe.name}">View Recipe</button>

     </section>`
    recipeSelectionPage.innerHTML = renderer;
  });
}

const formatRecipeCard = () => {
  const ingredientList = makeList(currentRecipe, 'ingredient')
  const instructionList = makeList(currentRecipe, 'instructions')
  const price = currentRecipe.getCostOfIngredients(ingredients)
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
    </section>`
  renderer = card;
  recipeCardPage.innerHTML = renderer;
}

const renderRecipes = (recipes, location, string) => {
  let stringify = JSON.stringify(string)
  location.innerHTML = '';
  recipes.map((recipe) => {
  location.innerHTML +=
  `<section class="saved-recipe-box">
     <p onclick="showRecipeCard(event.target.innerText)" class="list-item">${recipe.name}</p>
     <img onclick='deleteRecipe(event, ${stringify})' class="trashcan" src='images/delete.png'/>
   </section>`
  })
}
