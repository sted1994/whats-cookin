const recipes = fetch('https://whats-cookin-api.netlify.app/data/recipes.js').then(response => response.json());
const ingredients = fetch('https://whats-cookin-api.netlify.app/data/ingredients.js').then(response => response.json());
const users = fetch('https://whats-cookin-api.netlify.app/data/users.js').then(response => response.json());
const data = {
  recipes: recipes,
  users: users,
  ingredients: ingredients,
};
export { data };
