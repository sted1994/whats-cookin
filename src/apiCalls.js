// import {newRecipeRepository} from './scripts'
const recipes = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes').then(response => response.json())
const ingredients = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients').then(response => response.json())
const users = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users').then(response => response.json())
const data = {
  recipes: recipes,
  users: users,
  ingredients: ingredients,
}
export { data }
