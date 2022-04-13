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
import { domUpdates } from './domUpdates';
import { data } from './apiCalls';

let newRecipeRepository;
let currentUser;
let currentRecipe;
let ingredients;
let usersData;
let recipeDataClasses;

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


const promise = Promise.all([data.recipes, data.ingredients, data.users]).then(results => {
   ingredients = results[1].ingredientsData;
   usersData = results[2].usersData;
   recipeDataClasses = results[0].recipeData.map((recipe) => {
   return new RecipeCard(recipe);
   })
   newRecipeRepository = new RecipeRepository(recipeDataClasses);
}).then(randomUser => getRandomUser());


//if we have time we would like to refactor the function below to be more SRP
document.addEventListener('keypress', function(event) {
  if(event.key === "Enter" && searchInput.value){
    newRecipeRepository.getRecipesBySearch(searchInput.value);
    domUpdates.displayElement([mainPage, myRecipes, recipeCardPage, shoppingList, recipeSelectionPage], recipeSelectionPage);
    domUpdates.showRecipes(newRecipeRepository, ingredients);
    newRecipeRepository.getAllRecipes(recipeDataClasses);
    searchInput.value = "";
  } else if(event.key === "Enter") {
    domUpdates.renderRecipes(currentUser.searchFavs(favSearch.value), favorites, "favRecipes");
    favSearch.value = "";
  };
});

window.addEventListener('load', function() {
  domUpdates.displayElement([mainPage, myRecipes, recipeCardPage,  shoppingList, recipeSelectionPage], mainPage);
});

homeTab.addEventListener('click', function() {
  domUpdates.displayElement([mainPage, myRecipes, recipeCardPage,  shoppingList, recipeSelectionPage], mainPage);
});

myRecipesTab.addEventListener('click', function() {
  domUpdates.displayElement([mainPage, myRecipes, recipeCardPage, shoppingList, recipeSelectionPage], myRecipes);
});

shoppingTab.addEventListener('click', function() {
  domUpdates.displayElement([mainPage, myRecipes, recipeCardPage, shoppingList, recipeSelectionPage], shoppingList);
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
  searchInput.value = "";
});

clearFilterBtn.addEventListener('click', function(){
  domUpdates.renderRecipes(currentUser.favRecipes, favorites, "favRecipes");
});





function getRandomUser(data) {
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
    };
  });
  return currentRecipe
}
window.assignCurrentRecipe = assignCurrentRecipe

window.ingredients = ingredients
