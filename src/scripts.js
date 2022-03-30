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
import './data/ingredients';
import './data/recipes';
import './data/users';
import './classes/RecipeCard';
import './classes/RecipeRepository';
import { recipeData } from './data/recipes'

const mainPage = document.querySelector('.main')
const recipePage = document.querySelector('.recipe-selection')
const allRecipes = document.querySelector(".all-recipes")
// const { recipeData } = require('../src/data/recipes');

allRecipes.addEventListener('click', function(){
  toggleView(mainPage)
  toggleView(recipePage)
  showAllRecipes()
})

const toggleView = (element) => {
  element.classList.toggle('hidden')
}

const showAllRecipes = () => {
  // console.log(recipeData)
  recipePage.innerText += recipeData
}
console.log('Hello world');
