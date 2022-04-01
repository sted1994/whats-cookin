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
import { ingredientsData } from './data/ingredients';
import './data/recipes';
import './data/users';
import { RecipeCard } from './classes/RecipeCard';
import { RecipeRepository } from './classes/RecipeRepository';
import { recipeData } from './data/recipes'

const mainPage = document.querySelector('.main')
const recipePage = document.querySelector('.recipe-selection')
const allRecipes = document.querySelector(".all-recipes")
const searchInput = document.getElementById("search-input")
const magButton = document.querySelector(".mag-btn")
// const { recipeData } = require('../src/data/recipes');

allRecipes.addEventListener('click', function(){
  const newRecipeRepository = new RecipeRepository(recipeData);
  toggleView(mainPage)
  toggleView(recipePage)
  showRecipes(newRecipeRepository)
})

magButton.addEventListener('click', function() {
  const newRecipeRepository = new RecipeRepository(recipeData);
  newRecipeRepository.getRecipesBySearch(searchInput.value)
  toggleView(mainPage)
  toggleView(recipePage)
  showRecipes(newRecipeRepository)
})

const toggleView = (element) => {
  element.classList.toggle('hidden')
}

const showRecipes = (recipeInfo) => {
  let renderer = " ";
    recipeInfo.recipes.map(recipe => {
    const newRecipeCard = new RecipeCard(recipe);
    const ingredientList = newRecipeCard.getIngredients(ingredientsData)
    const displayList = ingredientList.reduce((string, ingredient) => {
        string += `<li class="recipe-select-ingredient">${ingredient}</li>`
        return string;
      }, " ");
    renderer +=
    `<div class="recipe-select-box">
       <h1 class="recipe-select-name">${recipe.name}</h1>
       <div class="recipe-content-box">
         <img class="recipe-pic" src="${recipe.image}" alt="Spaghetti">
         <ul class="recipe-select-ingredients">
          ${displayList}
         </ul>
       </div>
     </div>`

    recipePage.innerHTML = renderer;
  });
}
