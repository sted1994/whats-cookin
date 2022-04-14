// import {newRecipeRepository} from './scripts'
const recipes = fetch('http://localhost:3001/api/v1/recipes').then(response => response.json())
const ingredients = fetch('	http://localhost:3001/api/v1/ingredients').then(response => response.json())
const users = fetch('http://localhost:3001/api/v1/users').then(response => response.json())
const data = {
  recipes: recipes,
  users: users,
  ingredients: ingredients,
}
export { data }
