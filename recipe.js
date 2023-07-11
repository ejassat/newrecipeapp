const form = document.querySelector('form');
const recipeList = document.querySelector('#my-recipes');
const noRecipes = document.getElementById('no-recipes');
const searchBox = document.getElementById('search-box');

let recipes = [];

function handleSubmit(event) {
  event.preventDefault();
  
  const recipeName = document.querySelector('#recipe-name');
  const recipeIngr = document.querySelector('#recipe-ingredients');
  const recipeMethod = document.querySelector('#recipe-method');
  const name = recipeName.value.trim();
  const ingredients = recipeIngr.value.trim().split(',').map(i => i.trim());
  const method = recipeMethod.value.trim();
  
  if (name && ingredients.length > 0 && method) {
    const newRecipe = { name, ingredients, method };
    recipes.push(newRecipe);
    
    recipeName.value = '';
    recipeIngr.value = '';
    recipeMethod.value = '';
    
    displayRecipes();
  }
}

function displayRecipes() {
  recipeList.innerHTML = '';
  recipes.forEach((recipe, index) => {
    const recipeDiv = document.createElement('div');
    recipeDiv.innerHTML = `
      <h3>${recipe.name}</h3>
      <p><strong>Ingredients:</strong></p>
      <ul>
        ${recipe.ingredients.map(ingr => `<li>${ingr}</li>`).join('')}
      </ul>
      <p><strong>Method:</strong></p>
      <p>${recipe.method}</p>
      <button class="delete-button" data-index="${index}">Delete</button>`;
    recipeDiv.classList.add('recipe');
    recipeList.appendChild(recipeDiv);
  });
  if (recipes.length > 0) {
	noRecipes.style.display = 'none';
  }
  else {
	noRecipes.style.display = 'flex';
  }
}

function handleDelete(event) {
  if (event.target.classList.contains('delete-button')) {
    const index = event.target.dataset.index;
    recipes.splice(index, 1);
    displayRecipes();
	searchBox.value = '';
  }
}

function search(query) {
  const serachRecipes = recipes.filter(recipe => {
    return recipe.name.toLowerCase().includes(query.toLowerCase());
  });
  recipeList.innerHTML = '';
  serachRecipes.forEach(recipe => {
    const recipeEl = document.createElement('div');
    recipeEl.innerHTML = `
      <h3>${recipe.name}</h3>
      <p><strong>Ingredients:</strong></p>
      <ul>
        ${recipe.ingredients.map(ingr => `<li>${ingr}</li>`).join('')}
      </ul>
      <p><strong>Method:</strong></p>
      <p>${recipe.method}</p>
      <button class="delete-button" data-index="${recipes.indexOf(recipe)}">
		Delete
	  </button>`;
    recipeEl.classList.add('recipe');
    recipeList.appendChild(recipeEl);
  });
}

form.addEventListener('submit', handleSubmit);
recipeList.addEventListener('click', handleDelete);
searchBox.addEventListener('input', event => search(event.target.value));