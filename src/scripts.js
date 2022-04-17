import './styles.css';
import apiCalls from './apiCalls';
import './images/chicken.png';
import './images/beef.png';
import './images/left-arrow.png';
import './images/magnifying-glass.png';
import './images/pork.png';
import './images/right-arrow.png';
import './images/thyme.png';
import './images/vegitarian.png';
import './images/delete.png';
import { RecipeCard } from './classes/RecipeCard';
import { RecipeRepository } from './classes/RecipeRepository';
import { User } from './classes/User';
import { Pantry } from './classes/Pantry';
import { domUpdates } from './domUpdates';
import { data } from './apiCalls';

let newRecipeRepository;
let currentUser;
let currentRecipe;
let ingredients;
let usersData;
let recipeDataClasses;
let currentPantry;

const mainPage = document.querySelector('.main');
const allRecipesTab = document.querySelector('.all-recipes');
const recipeSelectionPage = document.querySelector('.recipe-selection');
const searchInput = document.getElementById("search-input");
const magButton = document.querySelector(".mag-btn");
const recipeCardPage = document.querySelector('.display-recipe');
const myRecipes = document.querySelector('.my-recipes');
const toCookBox = document.getElementById('recipes-to-cook');
const favRecipes = document.getElementById('fav-recipes');
const shoppingList = document.querySelector('.shopping-list-page');
const homeTab = document.querySelector('.home');
const myRecipesTab = document.querySelector('.saved-recipes');
const shoppingTab = document.querySelector('.shopping-list-tab');
const toCook = document.querySelector('.recipes-to-cook-list');
const favorites = document.querySelector('.favorite-recipes-list');
const favSearch = document.getElementById("recipe-search-input");
const clearFilterBtn = document.querySelector('.clear-filter-Btn');
const pantry = document.querySelector('.pantry-list');
const groceryList = document.querySelector('.shopping-list');
const submitIngredientBtn = document.querySelector('.submit-ingredient')
const ingredientToAdd = document.querySelector('.ingredient-to-add')
const amountToAdd = document.querySelector('.number-to-add')
const errorMsg = document.querySelector('.error-msg')

const promise = Promise.all([data.recipes, data.ingredients, data.users]).then(results => {
   ingredients = results[1];
   domUpdates.list = results[1];
   domUpdates.elements = [mainPage, myRecipes, recipeCardPage, shoppingList, recipeSelectionPage, pantry, groceryList];
   usersData = results[2];
   recipeDataClasses = results[0].map((recipe) => {
   return new RecipeCard(recipe);
   })
   newRecipeRepository = new RecipeRepository(recipeDataClasses);
}).then(randomUser => {
  getRandomUser()
  currentPantry = new Pantry(currentUser.userInfo.pantry);
  domUpdates.pantry = currentPantry;
  domUpdates.renderPantry(pantry, domUpdates.pantry.userPantry)
});

document.addEventListener('keypress', function(event) {
  if(event.key === "Enter" && searchInput.value){
    newRecipeRepository.getRecipesBySearch(searchInput.value);
    domUpdates.displayElement([mainPage, myRecipes, recipeCardPage, shoppingList, recipeSelectionPage], recipeSelectionPage);
    domUpdates.showRecipes(newRecipeRepository, ingredients);
    newRecipeRepository.getAllRecipes(recipeDataClasses);
    clearInput(searchInput);
  } else if(event.key === "Enter") {
    domUpdates.renderRecipes(currentUser.searchFavs(favSearch.value), favorites, "favRecipes");
    clearInput(favSearch);
  };
});

window.addEventListener('load', function() {
  domUpdates.displayElement([mainPage, myRecipes, recipeCardPage,  shoppingList, recipeSelectionPage], mainPage);
  errorMsg.classList.add("hidden")
});

homeTab.addEventListener('click', function() {
  domUpdates.displayElement([mainPage, myRecipes, recipeCardPage,  shoppingList, recipeSelectionPage], mainPage);
});

myRecipesTab.addEventListener('click', function() {
  domUpdates.displayElement([mainPage, myRecipes, recipeCardPage, shoppingList, recipeSelectionPage], myRecipes);
});

shoppingTab.addEventListener('click', function() {
  domUpdates.displayElement([mainPage, myRecipes, recipeCardPage, shoppingList, recipeSelectionPage], shoppingList);
  pantry.classList.remove("hidden")
  groceryList.classList.remove("hidden")
});

allRecipesTab.addEventListener('click', function(){
  newRecipeRepository.getAllRecipes(recipeDataClasses);
  domUpdates.displayElement([mainPage, myRecipes, recipeCardPage, shoppingList, recipeSelectionPage], recipeSelectionPage);
  domUpdates.showRecipes(newRecipeRepository, ingredients);
});

magButton.addEventListener('click', function() {
  newRecipeRepository.getRecipesBySearch(searchInput.value);
  domUpdates.displayElement([mainPage, myRecipes, recipeCardPage, shoppingList, recipeSelectionPage], recipeSelectionPage);
  domUpdates.showRecipes(newRecipeRepository, ingredients);
  newRecipeRepository.getAllRecipes(recipeDataClasses);
  clearInpuut(searchInput);
});

clearFilterBtn.addEventListener('click', function(){
  domUpdates.renderRecipes(currentUser.favRecipes, favorites, "favRecipes");
});

submitIngredientBtn.addEventListener('click', function(event){
  event.preventDefault()
  addIngredient(ingredientToAdd.value, Number(amountToAdd.value))
  showError(ingredientToAdd.value, Number(amountToAdd.value))
  domUpdates.renderPantry(pantry, domUpdates.pantry.userPantry)
  clearInput(ingredientToAdd);
  clearInput(amountToAdd);
})

function getRandomUser() {
  let user = usersData[Math.floor(Math.random() * usersData.length)];
  currentUser = new User(user);
};

const saveRecipe = (event) => {
  if(event === 'Add To Saved Recipes') {
    currentUser.addToCookRecipes(currentRecipe);
  } else if(event === 'Add To Favorites') {
    currentUser.addToFavRecipes(currentRecipe);
  };
  domUpdates.renderRecipes(currentUser.recipesToCook, toCook, "recipesToCook");
  domUpdates.renderRecipes(currentUser.favRecipes, favorites, "favRecipes");
};
window.saveRecipe = saveRecipe;

const deleteRecipe = (event, recipes) => {
  if(recipes === "recipesToCook") {
    let recipesToCook = currentUser.recipesToCook.filter((recipe) => {
      return recipe.name !== event.target.parentElement.innerText;
    });
    currentUser.recipesToCook = recipesToCook;
    domUpdates.renderRecipes(currentUser.recipesToCook, toCook, "recipesToCook");
  } else {
    var favRecipes = currentUser.favRecipes.filter((recipe) => {
      return recipe.name !== event.target.parentElement.innerText;
    });
    currentUser.favRecipes = favRecipes;
    domUpdates.renderRecipes(currentUser.favRecipes, favorites, "favRecipes");
  };
};
window.deleteRecipe = deleteRecipe;

const assignCurrentRecipe = (event) => {
  newRecipeRepository.recipes.forEach(recipe => {
    if(recipe.name === event) {
      currentRecipe = recipe;
      domUpdates.recipe = recipe;
    };
  });
  return currentRecipe
}

const addIngredient = (ingredient, amount) => {
  const test = {
    ingredient: null,
    amount: amount
  };
  ingredients.forEach(item => {
    if(item.name === ingredient && domUpdates.pantry.userPantry.find(stock => item.id === stock.ingredient)){
      domUpdates.pantry.userPantry.forEach(stock => {
        if(item.id === stock.ingredient){
          stock.amount += amount
        }
      })
    } else if(item.name === ingredient && !domUpdates.pantry.userPantry.find(stock => item.id === stock.ingredient)){
      test.ingredient = item.id
      domUpdates.pantry.userPantry.push(test)
    }
  })
  errorMsg.classList.add("hidden")
}

const showError = (ingredient, amount) => {
  let error = true;
  var a = document.forms["form"]["ingredient"].value;
  var b = document.forms["form"]["amount"].value;
  ingredients.forEach(item => {
    if (ingredient === item.name) {
      error = false;
    };
  });
    if(!a || !b) {
      errorMsg.innerText = "Motherfuckers, you need to fill in both fields before submitting!"
      error = true;
    };
     if (error === true) {
       errorMsg.classList.remove("hidden")
  };
    errorMsg.innerText = "Sorry, the ingredient you entered is invalid"
};

const clearInput = (input) => {
  input.value = ""
};

window.assignCurrentRecipe = assignCurrentRecipe
