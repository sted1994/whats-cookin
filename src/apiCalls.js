const recipes = fetch('http://whats-cookin-api.netlify.app/api/v1/recipes').then(response => response.json());
const ingredients = fetch('	http://whats-cookin-api.netlify.app/api/v1/ingredients').then(response => response.json());
const users = fetch('http://whats-cookin-api.netlify.app/api/v1/users').then(response => response.json());
const data = {
  recipes: recipes,
  users: users,
  ingredients: ingredients,
};
export { data };
