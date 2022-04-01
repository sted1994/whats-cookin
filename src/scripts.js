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
const recipeSelectionPage = document.querySelector('.recipe-selection')
const allRecipes = document.querySelector(".all-recipes")
const searchInput = document.getElementById("search-input")
const magButton = document.querySelector(".mag-btn")
const recipeCardPage = document.querySelector('.display-recipe')
const recipeCardTitle = document.querySelector('.recipe-title')

document.addEventListener('keypress', function(event) {
  if(event.key === "Enter"){
    const newRecipeRepository = new RecipeRepository(recipeData);
    newRecipeRepository.getRecipesBySearch(searchInput.value)
    toggleView(mainPage)
    toggleView(recipeSelectionPage)
    showRecipes(newRecipeRepository)
  }
})

  let newRecipeRepository = new RecipeRepository(recipeData);
allRecipes.addEventListener('click', function(){
  toggleView(mainPage)
  toggleView(recipeSelectionPage)
  showRecipes(newRecipeRepository)
})

magButton.addEventListener('click', function() {
  newRecipeRepository.getRecipesBySearch(searchInput.value)
  toggleView(mainPage)
  toggleView(recipeSelectionPage)
  showRecipes(newRecipeRepository)
})

const toggleView = (element) => {
  element.classList.toggle('hidden')
}

const showRecipeCard = (event) => {
  toggleView(recipeSelectionPage)
  toggleView(recipeCardPage)
  const currentRecipe = newRecipeRepository.recipes.filter(recipe => recipe.name === event)
  formatRecipeCard(currentRecipe)
}

window.showRecipeCard = showRecipeCard;

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

const makeList = (recipe, method) => {
  const newRecipeCard = new RecipeCard(recipe);
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

const formatRecipeCard = (currentRecipe) => {
  const newRecipe = new RecipeCard(currentRecipe[0])
  const ingredientList = makeList(currentRecipe[0], 'ingredient')
  const instructionList = makeList(currentRecipe[0], 'instructions')
  const price = newRecipe.getCostOfIngredients(ingredientsData)
  console.log(price)
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
    <button class="recipes-to-cook-btn">Add To Saved Recipes</button>
    <button class="recipes-to-fav-btn">Add To Favorites</button>
  </section>`
  renderer = card;
  recipeCardPage.innerHTML = renderer;
}
