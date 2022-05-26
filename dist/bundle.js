/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postIngredient": () => (/* binding */ postIngredient)
/* harmony export */ });
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _images_chicken_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _images_beef_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _images_left_arrow_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12);
/* harmony import */ var _images_magnifying_glass_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _images_pork_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var _images_right_arrow_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(14);
/* harmony import */ var _images_thyme_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7);
/* harmony import */ var _images_vegitarian_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(15);
/* harmony import */ var _images_delete_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(16);
/* harmony import */ var _classes_RecipeCard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(17);
/* harmony import */ var _classes_RecipeRepository__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(18);
/* harmony import */ var _classes_User__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(19);
/* harmony import */ var _classes_Pantry__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(20);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(21);


















let newRecipeRepository;
let currentUser;
let currentRecipe;
let ingredients;
let usersData;
let recipeDataClasses;
let currentPantry;
let focus;

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
const errorMessage = document.querySelector('.error-message')

const promise = Promise.all([_apiCalls__WEBPACK_IMPORTED_MODULE_1__.data.recipes, _apiCalls__WEBPACK_IMPORTED_MODULE_1__.data.ingredients, _apiCalls__WEBPACK_IMPORTED_MODULE_1__.data.users]).then(results => {
   ingredients = results[1];
   _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.list = results[1];
   _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.elements = [mainPage, myRecipes, recipeCardPage, shoppingList, recipeSelectionPage, pantry, groceryList];
   usersData = results[2];
   recipeDataClasses = results[0].map((recipe) => {
   return new _classes_RecipeCard__WEBPACK_IMPORTED_MODULE_11__.RecipeCard(recipe);
   })
   newRecipeRepository = new _classes_RecipeRepository__WEBPACK_IMPORTED_MODULE_12__.RecipeRepository(recipeDataClasses);
}).then(randomUser => {
  getRandomUser(usersData);
  currentPantry = new _classes_Pantry__WEBPACK_IMPORTED_MODULE_14__.Pantry(currentUser.userInfo.pantry);
  _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.pantry = currentPantry;
  _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.renderPantry(pantry, _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.pantry.userPantry);
}).catch(error => console.log("Failed to retrieve data. Reload page."));

document.addEventListener('keypress', function(event) {
  if(event.key === "Enter" && searchInput.value){
    if(newRecipeRepository.getRecipesBySearch(searchInput.value).length >= 1) {
      newRecipeRepository.getRecipesBySearch(searchInput.value);
      _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.displayElement([mainPage, myRecipes, recipeCardPage, shoppingList,   recipeSelectionPage], recipeSelectionPage);
      _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.showRecipes(newRecipeRepository, ingredients);
      newRecipeRepository.getAllRecipes(recipeDataClasses);
      clearInput(searchInput);
    } else if (newRecipeRepository.getRecipesBySearch(searchInput.value).length === 0){
      searchInput.value = "Sorry we don't have that. Try again.";
      searchInput.style.color = "red";
      setTimeout(() => {clearInput(searchInput), searchInput.style.color = "black"}, 2000);
    }
  } else if(event.key === "Enter" && favSearch.value) {
    _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.renderRecipes(currentUser.searchFavs(favSearch.value), favorites, "favRecipes");
    clearInput(favSearch);
  } else if (event.key === "Enter" && focus === 5){
    searchInput.value = "Please enter a search value";
    searchInput.style.color = "red";
    setTimeout(() => {clearInput(searchInput), searchInput.style.color = "black"}, 2000);
  }
});

window.addEventListener('load', function() {
  _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.displayElement([mainPage, myRecipes, recipeCardPage,  shoppingList, recipeSelectionPage], mainPage);
  errorMsg.classList.add("hidden");

});

homeTab.addEventListener('click', function() {
  _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.displayElement([mainPage, myRecipes, recipeCardPage,  shoppingList, recipeSelectionPage], mainPage);
});

myRecipesTab.addEventListener('click', function() {
  _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.displayElement([mainPage, myRecipes, recipeCardPage, shoppingList, recipeSelectionPage], myRecipes);
});

shoppingTab.addEventListener('click', function() {
  _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.displayElement([mainPage, myRecipes, recipeCardPage, shoppingList, recipeSelectionPage], shoppingList);
  pantry.classList.remove("hidden");
  groceryList.classList.remove("hidden");
});

allRecipesTab.addEventListener('click', function(){
  newRecipeRepository.getAllRecipes(recipeDataClasses);
  _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.displayElement([mainPage, myRecipes, recipeCardPage, shoppingList, recipeSelectionPage], recipeSelectionPage);
  _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.showRecipes(newRecipeRepository, ingredients);
});

magButton.addEventListener('click', function() {
  newRecipeRepository.getRecipesBySearch(searchInput.value);
  _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.displayElement([mainPage, myRecipes, recipeCardPage, shoppingList, recipeSelectionPage], recipeSelectionPage);
  _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.showRecipes(newRecipeRepository, ingredients);
  newRecipeRepository.getAllRecipes(recipeDataClasses);
  clearInput(searchInput);
});

clearFilterBtn.addEventListener('click', function(){
  _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.renderRecipes(currentUser.favRecipes, favorites, "favRecipes");
});

submitIngredientBtn.addEventListener('click', function(event){
  event.preventDefault();
  addIngredient(ingredientToAdd.value, Number(amountToAdd.value));
  showError(ingredientToAdd.value, Number(amountToAdd.value));
  _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.renderPantry(pantry, _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.pantry.userPantry);
  clearInput(ingredientToAdd);
  clearInput(amountToAdd);
})

function getRandomUser() {
  let user = usersData[Math.floor(Math.random() * usersData.length)];
  currentUser = new _classes_User__WEBPACK_IMPORTED_MODULE_13__.User(user);
};

const saveRecipe = (event) => {
  if(event === 'Add To Saved Recipes') {
    checkPantry(currentRecipe.ingredients);
  } else if(event === 'Add To Favorites') {
    currentUser.addToFavRecipes(currentRecipe);
  };
  _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.renderRecipes(currentUser.recipesToCook, toCook, "recipesToCook");
  _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.renderRecipes(currentUser.favRecipes, favorites, "favRecipes");
};
window.saveRecipe = saveRecipe;

const deleteRecipe = (event, recipes) => {
  if(recipes === "recipesToCook") {
    let recipesToCook = currentUser.recipesToCook.filter((recipe) => {
      return recipe.name !== event.target.parentElement.innerText;
    });
    currentUser.recipesToCook = recipesToCook;
    _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.renderRecipes(currentUser.recipesToCook, toCook, "recipesToCook");
  } else {
    var favRecipes = currentUser.favRecipes.filter((recipe) => {
      return recipe.name !== event.target.parentElement.innerText;
    });
    currentUser.favRecipes = favRecipes;
    _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.renderRecipes(currentUser.favRecipes, favorites, "favRecipes");
  };
};
window.deleteRecipe = deleteRecipe;

const assignCurrentRecipe = (event) => {
  newRecipeRepository.recipes.forEach(recipe => {
    if(recipe.name === event) {
      currentRecipe = recipe;
      _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.recipe = recipe;
    };
  });
  return currentRecipe;
};


const postIngredient = (userId, ingId, modAmount, modification) => {
  if(modification === 'subb'){
    modAmount = -modAmount;
  }
  fetch("http://localhost:3001/api/v1/users", {
    method: 'POST',
    body: JSON.stringify({
      userID: userId,
      ingredientID: ingId,
      ingredientModification: modAmount
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
  .then(data => console.log(data.message))

};

const addIngredient = (ingredient, amount) => {
  const newPantryItem = {
    ingredient: null,
    amount: amount
  };
  ingredients.forEach(item => {
    if(item.name === ingredient && _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.pantry.userPantry.find(stock => item.id === stock.ingredient)){
      _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.pantry.userPantry.forEach(stock => {
        if(item.id === stock.ingredient){
          stock.amount += amount;
          postIngredient(currentUser.userInfo.id, item.id, newPantryItem.amount, 'add');
        };
      });
    } else if(item.name === ingredient && !_domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.pantry.userPantry.find(stock => item.id === stock.ingredient)){
      newPantryItem.ingredient = item.id;
      postIngredient(currentUser.userInfo.id, item.id, newPantryItem.amount, 'add');
      _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.pantry.userPantry.push(newPantryItem);
    };
  });
  errorMsg.classList.add("hidden");
};

const showError = (ingredient, amount) => {
  errorMsg.innerText = "";
  const a = document.forms["form"]["ingredient"].value;
  const b = document.forms["form"]["amount"].value;
  const present = ingredients.filter(ingredients => ingredients.name === ingredient);

  if(!a || !b) {
    errorMsg.innerText = "Both fields need to be filled";
    errorMsg.classList.remove("hidden");
  } else if (!present[0]){
      errorMsg.innerText = "Sorry, the ingredient entered is invalid";
      errorMsg.classList.remove("hidden");
  } else {
    errorMsg.classList.add("hidden");
  }
};

const clearInput = (input) => {
  input.value = "";
};

const checkPantry = (ingredients) => {
  let cantCook = true;
  let idList = [];
  currentPantry.userPantry.forEach(item => {
    idList.push(item.ingredient);
  });
  for (var i = 0; i < currentPantry.userPantry.length; i++) {
    for (var j = 0; j < ingredients.length; j++) {
      if ((currentPantry.userPantry[i].ingredient === ingredients[j].id) && (ingredients[j].quantity.amount > currentPantry.userPantry[i].amount)){
         cantCook = true;
         _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.needMoreStockError(event);

      } else if (((currentPantry.userPantry[i].ingredient === ingredients[j].id) && (ingredients[j].quantity.amount <= currentPantry.userPantry[i].amount))) {
        cantCook = false;
      } else if (!idList.includes(ingredients[j].id)) {
         cantCook = true;
         _domUpdates__WEBPACK_IMPORTED_MODULE_15__.domUpdates.needMoreStockError(event);

      }
    };
  };
  if (cantCook === false) {
    currentPantry.removeFromShoppingList(currentRecipe);
    currentUser.addToCookRecipes(currentRecipe);
    currentPantry.removeStockFromPantry(currentRecipe, currentUser.userInfo.id);
  };

};

window.assignCurrentRecipe = assignCurrentRecipe;


/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_thyme_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _images_magnifying_glass_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
// Imports





var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_thyme_png__WEBPACK_IMPORTED_MODULE_3__["default"]);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_magnifying_glass_png__WEBPACK_IMPORTED_MODULE_4__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  font-family: Quicksand;\n  margin: 0px;\n  padding: 0px;\n}\n\nbody {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\n.add-ingredient {\n  display: flex;\n}\n\n/*~~~~~~~~Nav Bar~~~~~~~~*/\nnav {\n  align-items: flex-end;\n  background-image: linear-gradient(#2F9056, #65b87e);\n  display: flex;\n  justify-content: space-around;\n  padding-top: 10px;\n}\n\n.nav-button {\n  background-color: #c2e2c3;\n  border-top-left-radius: 6px;\n  border-top-right-radius: 6px;\n  box-shadow: 3px -3px 6px #387546;\n  cursor: pointer;\n  padding: 15px;\n}\n\nh1 {\n  font-size: 44px;\n  margin-top: 50px;\n  text-align: center;\n}\n\n/*~~~~~~~~My Recipes~~~~~~~~*/\n.my-recipes-flexbox {\n  align-items: center;\n  display: flex;\n  justify-content: space-around;\n}\n\n.my-recipes-box {\n  align-items: center;\n  background: rgba(255, 255, 255, 0.7);\n  border-radius: 10px;\n  display: flex;\n  flex-direction: column;\n  font-size: 24px;\n  height: 600px;\n  margin-top: 50px;\n  padding-top: 40px;\n  width: 600px;\n}\n\n#recipe-search-input {\n  background-color: #c2e2c3;\n  border: 0;\n  border-radius: 6px;\n  box-shadow: 1px 1px 4px #c5cbd4;\n  box-shadow: -1px -1px 4px #c5cbd4;\n  font-size: 18px;\n  height: 30px;\n  margin-bottom: 30px;\n  margin-top: 30px;\n  padding-left: 10px;\n  text-align: center;\n  width: 200px;\n}\n\n.my-recipes-title {\n  margin-bottom: 20px;\n}\n\n.list-item {\n  margin: 20px;\n}\n\n.trashcan {\n  cursor: pointer;\n  height: 22px;\n  margin-left: 5px;\n  padding-top: 26px;\n}\n\n.trashcan:hover {\n  height: 25px;\n}\n\n.pantry-list,\n.shopping-list,\n.favorite-recipes-list,\n.recipes-to-cook-list {\n  cursor: pointer;\n  overflow-y: scroll;\n}\n\n.clear-filter-Btn,\n#view-recipe-btn {\n  background-image: linear-gradient(#2F9056, #65b87e);\n  border-radius: 6px;\n  border: none;\n  box-shadow: 2px -2px 6px #b5b7ba;\n  font-size: 20px;\n  height: 30px;\n  margin-top: 10px;\n  width: 140px;\n}\n\n.clear-filter-Btn:hover,\n#view-recipe-btn:hover,\n.carousel__slide:hover,\n.view-recipe-btn:hover,\n.trashcan:hover {\n  cursor: pointer;\n}\n\n/*~~~~~~~~Recipe Card Section~~~~~~~~*/\n.card-section-title {\n  font-size: 24px;\n  margin: 20px;\n}\n\n.cost-info-section {\n  display: flex;\n  margin-top: 30px;\n}\n\n.recipe-cost {\n  font-size: 20px;\n}\n\n.add-ingredients-btn {\n  background-image: linear-gradient(#2F9056, #65b87e);\n  border: none;\n  border-radius: 6px;\n  box-shadow: 2px -2px 6px #b5b7ba;\n  cursor: pointer;\n  height: 32px;\n  width: 150px;\n}\n\n.add-ingredients-btn:hover {\n  height: 34px;\n  width: 160px;\n}\n\n.saved-recipe-box,\n.save-buttons {\n  display: flex;\n}\n\n.recipes-to-save-btn {\n  background-image: linear-gradient(#2F9056, #65b87e);\n  border: none;\n  border-radius: 6px;\n  box-shadow: 2px -2px 6px #b5b7ba;\n  cursor: pointer;\n  height: 50px;\n  margin: 50px;\n  width: 150px;\n}\n\n.recipes-to-save-btn:hover {\n  height: 55px;\n  width: 165px;\n}\n\n/*~~~~~~~~Carousel~~~~~~~~*/\n.search-bar {\n  border-radius: 10px;\n  font-size: 30px;\n  height: 45px;\n  justify-content: center;\n  text-align: center;\n  width: 90%;\n}\n\n.mag-btn {\n  border-radius: 10px;\n  cursor: pointer;\n  height: 45px;\n}\n\n.mag-btn:hover {\n  background-image: linear-gradient(#2F9056, #65b87e);\n  cursor: pointer;\n  height: 50px;\n  width: 50px;\n}\n\n.magnifier-icon {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n  width: 30px;\n}\n\n.main {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n}\n\n.homepage-actions {\n  align-items: center;\n  background-color: rgba(255, 255, 255, 0.5);\n  display: flex;\n  flex-direction: column;\n  height: 600px;\n  justify-content: space-evenly;\n  margin-top: 5%;\n  width: 50%;\n}\n\n/*~~~~~~~~Recipe Select Page~~~~~~~~*/\n.recipe-select-box {\n  background: rgba(255, 255, 255, 0.7);\n  margin-left: 30px;\n  width: 90vw;\n}\n\n.recipe-select-name {\n  font-size: 30px;\n  text-align: left;\n}\n\n.recipe-pic {\n  height: 100px;\n  width: 100px;\n}\n\n.recipe-select-ingredients {\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.recipe-content-box {\n  display: flex;\n}\n\n.recipe-select-ingredient {\n  margin-left: 20px;\n  margin-right: 20px;\n  width: 100px;\n}\n\n/*~~~~~~~~Display~~~~~~~~*/\n.display-recipe {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n}\n\n.recipe-card {\n  background: rgba(255, 255, 255, 0.7);\n  width: 80vw;\n}\n\n.cost-info-section {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n}\n\n.recipe-card-ingredients {\n  display: flex;\n  flex-wrap: wrap;\n  margin-left: 20px;\n  margin-right: 20px;\n  width: 100%;\n}\n\n.instructions-list {\n  margin-left: 20px;\n  width: 100%;\n}\n\n.instruction {\n  margin-bottom: 20px;\n}\n\n.hidden {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA;EACE,sBAAA;EACA,WAAA;EACA,YAAA;AACF;;AAEA;EACE,yDAAA;EACA,4BAAA;EACA,sBAAA;AACF;;AAGA;EACE,aAAA;AAAF;;AASA,0BAAA;AAEA;EACE,qBAAA;EACA,mDAAA;EACA,aAAA;EACA,6BAAA;EACA,iBAAA;AAPF;;AAUA;EACE,yBAAA;EACA,2BAAA;EACA,4BAAA;EACA,gCAAA;EACA,eAAA;EACA,aAAA;AAPF;;AAUA;EACE,eAAA;EACA,gBAAA;EACA,kBAAA;AAPF;;AAUA,6BAAA;AACA;EACE,mBAAA;EACA,aAAA;EACA,6BAAA;AAPF;;AAUA;EACE,mBAAA;EACA,oCAAA;EACA,mBAAA;EACA,aAAA;EACA,sBAAA;EACA,eAAA;EACA,aAAA;EACA,gBAAA;EACA,iBAAA;EACA,YAAA;AAPF;;AAUA;EACE,yBAAA;EACA,SAAA;EACA,kBAAA;EACA,+BAAA;EACA,iCAAA;EACA,eAAA;EACA,YAAA;EACA,mBAAA;EACA,gBAAA;EACA,kBAAA;EACA,kBAAA;EACA,YAAA;AAPF;;AAUA;EACE,mBAAA;AAPF;;AAUA;EACE,YAAA;AAPF;;AAUA;EACE,eAAA;EACA,YAAA;EACA,gBAAA;EACA,iBAAA;AAPF;;AAUA;EACE,YAAA;AAPF;;AAUA;;;;EAIE,eAAA;EACA,kBAAA;AAPF;;AAUA;;EAEE,mDAAA;EACA,kBAAA;EACA,YAAA;EACA,gCAAA;EACA,eAAA;EACA,YAAA;EACA,gBAAA;EACA,YAAA;AAPF;;AAUA;;;;;EAKE,eAAA;AAPF;;AAUA,sCAAA;AAEA;EACE,eAAA;EACA,YAAA;AARF;;AAWA;EACE,aAAA;EACA,gBAAA;AARF;;AAWA;EACE,eAAA;AARF;;AAWA;EACE,mDAAA;EACA,YAAA;EACA,kBAAA;EACA,gCAAA;EACA,eAAA;EACA,YAAA;EACA,YAAA;AARF;;AAWA;EACE,YAAA;EACA,YAAA;AARF;;AAWA;;EAEE,aAAA;AARF;;AAWA;EACE,mDAAA;EACA,YAAA;EACA,kBAAA;EACA,gCAAA;EACA,eAAA;EACA,YAAA;EACA,YAAA;EACA,YAAA;AARF;;AAWA;EACE,YAAA;EACA,YAAA;AARF;;AAYA,2BAAA;AAEA;EACE,mBAAA;EACA,eAAA;EACA,YAAA;EACA,uBAAA;EACA,kBAAA;EACA,UAAA;AAVF;;AAaA;EACE,mBAAA;EACA,eAAA;EACA,YAAA;AAVF;;AAaA;EACE,mDAAA;EACA,eAAA;EACA,YAAA;EACA,WAAA;AAVF;;AAaA;EACE,yDAAA;EACA,WAAA;AAVF;;AAaA;EACE,mBAAA;EACA,aAAA;EACA,sBAAA;AAVF;;AAaA;EACE,mBAAA;EACA,0CAAA;EACA,aAAA;EACA,sBAAA;EACA,aAAA;EACA,6BAAA;EACA,cAAA;EACA,UAAA;AAVF;;AAaA,qCAAA;AACA;EACE,oCAAA;EACA,iBAAA;EACA,WAAA;AAVF;;AAaA;EACE,eAAA;EACA,gBAAA;AAVF;;AAaA;EACE,aAAA;EACA,YAAA;AAVF;;AAaA;EACE,aAAA;EACA,eAAA;AAVF;;AAaA;EACE,aAAA;AAVF;;AAaA;EACE,iBAAA;EACA,kBAAA;EACA,YAAA;AAVF;;AAcA,0BAAA;AAEA;EACE,mBAAA;EACA,aAAA;EACA,sBAAA;AAZF;;AAeA;EACE,oCAAA;EACA,WAAA;AAZF;;AAeA;EACE,aAAA;EACA,mBAAA;EACA,6BAAA;AAZF;;AAeA;EACE,aAAA;EACA,eAAA;EACA,iBAAA;EACA,kBAAA;EACA,WAAA;AAZF;;AAeA;EACE,iBAAA;EACA,WAAA;AAZF;;AAeA;EACE,mBAAA;AAZF;;AAeA;EACE,aAAA;AAZF","sourcesContent":["* {\n  font-family: Quicksand;\n  margin: 0px;\n  padding: 0px;\n}\n\nbody {\n  background-image: url(\"images/thyme.png\");\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\n\n.add-ingredient{\n  display: flex;\n}\n\n\n\n\n\n\n\n/*~~~~~~~~Nav Bar~~~~~~~~*/\n\nnav {\n  align-items: flex-end;\n  background-image: linear-gradient(#2F9056, #65b87e);\n  display: flex;\n  justify-content: space-around;\n  padding-top: 10px;\n}\n\n.nav-button {\n  background-color: #c2e2c3;\n  border-top-left-radius: 6px;\n  border-top-right-radius: 6px;\n  box-shadow: 3px -3px 6px rgb(56, 117, 70);\n  cursor: pointer;\n  padding: 15px;\n}\n\nh1 {\n  font-size: 44px;\n  margin-top: 50px;\n  text-align: center;\n}\n\n/*~~~~~~~~My Recipes~~~~~~~~*/\n.my-recipes-flexbox {\n  align-items: center;\n  display: flex;\n  justify-content: space-around;\n}\n\n.my-recipes-box {\n  align-items: center;\n  background: rgba(255, 255, 255, 0.7);\n  border-radius: 10px;\n  display: flex;\n  flex-direction: column;\n  font-size: 24px;\n  height: 600px;\n  margin-top: 50px;\n  padding-top: 40px;\n  width: 600px;\n}\n\n#recipe-search-input {\n  background-color: #c2e2c3;\n  border: 0;\n  border-radius: 6px;\n  box-shadow: 1px 1px 4px rgb(197, 203, 212);\n  box-shadow: -1px -1px 4px rgb(197, 203, 212);\n  font-size: 18px;\n  height: 30px;\n  margin-bottom: 30px;\n  margin-top: 30px;\n  padding-left: 10px;\n  text-align: center;\n  width: 200px;\n}\n\n.my-recipes-title {\n  margin-bottom: 20px;\n}\n\n.list-item {\n  margin: 20px;\n}\n\n.trashcan {\n  cursor: pointer;\n  height: 22px;\n  margin-left: 5px;\n  padding-top: 26px;\n}\n\n.trashcan:hover {\n  height: 25px;\n}\n\n.pantry-list,\n.shopping-list,\n.favorite-recipes-list,\n.recipes-to-cook-list{\n  cursor: pointer;\n  overflow-y: scroll;\n}\n\n.clear-filter-Btn,\n#view-recipe-btn{\n  background-image: linear-gradient(#2F9056, #65b87e);\n  border-radius: 6px;\n  border: none;\n  box-shadow: 2px -2px 6px rgb(181, 183, 186);\n  font-size: 20px;\n  height:30px;\n  margin-top: 10px;\n  width: 140px;\n}\n\n.clear-filter-Btn:hover,\n#view-recipe-btn:hover,\n.carousel__slide:hover,\n.view-recipe-btn:hover,\n.trashcan:hover {\n  cursor: pointer;\n}\n\n/*~~~~~~~~Recipe Card Section~~~~~~~~*/\n\n.card-section-title {\n  font-size: 24px;\n  margin: 20px;\n}\n\n.cost-info-section {\n  display: flex;\n  margin-top: 30px;\n}\n\n.recipe-cost {\n  font-size: 20px;\n}\n\n.add-ingredients-btn {\n  background-image: linear-gradient(#2F9056, #65b87e);\n  border: none;\n  border-radius: 6px;\n  box-shadow: 2px -2px 6px rgb(181, 183, 186);\n  cursor: pointer;\n  height: 32px;\n  width: 150px;\n}\n\n.add-ingredients-btn:hover {\n  height: 34px;\n  width: 160px;\n}\n\n.saved-recipe-box,\n.save-buttons {\n  display: flex;\n}\n\n.recipes-to-save-btn {\n  background-image: linear-gradient(#2F9056, #65b87e);\n  border: none;\n  border-radius: 6px;\n  box-shadow: 2px -2px 6px rgb(181, 183, 186);\n  cursor: pointer;\n  height: 50px;\n  margin: 50px;\n  width: 150px;\n}\n\n.recipes-to-save-btn:hover {\n  height: 55px;\n  width: 165px;\n}\n\n\n/*~~~~~~~~Carousel~~~~~~~~*/\n\n.search-bar{\n  border-radius: 10px;\n  font-size: 30px;\n  height: 45px;\n  justify-content: center;\n  text-align: center;\n  width: 90%;\n}\n\n.mag-btn{\n  border-radius: 10px;\n  cursor: pointer;\n  height: 45px;\n}\n\n.mag-btn:hover{\n  background-image: linear-gradient(#2F9056, #65b87e);\n  cursor: pointer;\n  height: 50px;\n  width: 50px;\n}\n\n.magnifier-icon{\n  background-image: url(\"images/magnifying-glass.png\");\n  width:30px;\n}\n\n.main{\n  align-items: center;\n  display:flex;\n  flex-direction: column;\n}\n\n.homepage-actions{\n  align-items: center;\n  background-color: rgba(255,255,255, .5);\n  display: flex;\n  flex-direction: column;\n  height: 600px;\n  justify-content: space-evenly;\n  margin-top: 5%;\n  width: 50%;\n}\n\n/*~~~~~~~~Recipe Select Page~~~~~~~~*/\n.recipe-select-box {\n  background: rgba(255, 255, 255, 0.7);\n  margin-left: 30px;\n  width: 90vw;\n}\n\n.recipe-select-name {\n  font-size: 30px;\n  text-align: left;\n}\n\n.recipe-pic {\n  height: 100px;\n  width: 100px;\n}\n\n.recipe-select-ingredients {\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.recipe-content-box {\n  display: flex;\n}\n\n.recipe-select-ingredient {\n  margin-left: 20px;\n  margin-right: 20px;\n  width: 100px;\n}\n\n\n/*~~~~~~~~Display~~~~~~~~*/\n\n.display-recipe{\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n}\n\n.recipe-card{\n  background: rgba(255, 255, 255, 0.7);\n  width: 80vw;\n}\n\n.cost-info-section{\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n}\n\n.recipe-card-ingredients{\n  display: flex;\n  flex-wrap: wrap;\n  margin-left: 20px;\n  margin-right: 20px;\n  width: 100%;\n}\n\n.instructions-list{\n  margin-left: 20px;\n  width: 100%;\n}\n\n.instruction{\n  margin-bottom: 20px;\n}\n\n.hidden {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/thyme.png");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/magnifying-glass.png");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "data": () => (/* binding */ data)
/* harmony export */ });
const recipes = fetch('https://whats-cookin-api.netlify.app/data/recipes.js').then(response => response.json());
const ingredients = fetch('https://whats-cookin-api.netlify.app/data/ingredients.js').then(response => response.json());
const users = fetch('https://whats-cookin-api.netlify.app/data/users.js').then(response => response.json());
const data = {
  recipes: recipes,
  users: users,
  ingredients: ingredients,
};



/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/chicken.png");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/beef.png");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/left-arrow.png");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/pork.png");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/right-arrow.png");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/vegitarian.png");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/delete.png");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecipeCard": () => (/* binding */ RecipeCard),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class RecipeCard {
  constructor(recipe) {
    this.name = recipe.name;
    this.ingredients = recipe.ingredients;
    this.image = recipe.image;
    this.id = recipe.id;
    this.tags = recipe.tags;
    this.instructions = recipe.instructions;

  }

getIngredients(ingredients) {
  const ingredientList = this.ingredients.reduce((arr, ingredient) => {
    const items = ingredients.forEach(item => {
      if(ingredient.id === item.id) {
        arr.push(`${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}; ${item.name}`);
      };
    });
    return arr;
  }, []);
  return ingredientList;
};

getCostOfIngredients(ingredients) {
  const ingredientList = this.ingredients.reduce((num, ingredient) => {
    const items = ingredients.forEach(item => {
      if(ingredient.id === item.id) {
        num += (item.estimatedCostInCents * ingredient.quantity.amount);
      };
    });
    return num;
  }, 0);
  return `$${(ingredientList/100).toFixed(2)}`;
};

getInstructions() {
  const instructionList = this.instructions.reduce((arr, instructions) => {
    const items = instructions.instruction;
    arr.push(items);
    return arr;
  }, []);
  return instructionList;
};
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RecipeCard);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecipeRepository": () => (/* binding */ RecipeRepository),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class RecipeRepository {
  constructor(recipes) {
    this.recipes = recipes;
  }

getRecipesBySearch(input) {
  const recipesByTag = this.recipes.filter((recipe) => {
    return recipe.tags.includes(input);
  });
  const recipesByName = this.recipes.filter((recipe) => {
    let upperCaseInput = input[0].toUpperCase() + input.slice(1);
    return recipe.name.includes(upperCaseInput);
  });
    recipesByTag.map((recipe) => {
      recipesByName.map((recipe2) => {
        if(recipe.id === recipe2.id) {
          recipesByName.splice([recipe], 1);
        };
      });
    });
  this.recipes = recipesByName.concat(recipesByTag);
  return this.recipes;
};

  getAllRecipes(recipes) {
    this.recipes = recipes;
  };
};






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RecipeRepository);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "User": () => (/* binding */ User),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class User {
  constructor(userInfo) {
    this.userInfo = userInfo;
    this.recipesToCook = [];
    this.favRecipes = [];
    this.shoppingList = [];
    this.cost = 0;
    this.filteredFavs = [];
  };

  addToCookRecipes(recipe) {
    if(!this.recipesToCook.includes(recipe)) {
      this.recipesToCook.push(recipe);
    };
  };

  addToFavRecipes(favRecipe) {
    if(!this.favRecipes.includes(favRecipe)) {
      this.favRecipes.push(favRecipe);
    };
  };

  removeFav(recipe) {
    const index = this.favRecipes.indexOf(recipe);
    this.favRecipes.splice(index, 1);
  };

  searchFavs(input) {
    const upperCaseInput = input[0].toUpperCase() + input.slice(1);
    const recipesByTag = this.favRecipes.reduce((arr, recipe) => {
       if(recipe.tags.includes(input)){
         arr.push(recipe);
       };
       return arr;
    }, []);
    const recipesByName = this.favRecipes.reduce((arr, recipe) => {
       if(recipe.name.includes(upperCaseInput)){
         arr.push(recipe);
       };
       return arr;
    }, []);

     const result = recipesByName.concat(recipesByTag).reduce((arr, recipe) => {
       if(!arr.includes(recipe)){
         arr.push(recipe);
       };
       return arr;
     },[]);
  return result;
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Pantry": () => (/* binding */ Pantry),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);

class Pantry {
  constructor(userPantry) {
    this.userPantry = userPantry;
    this.shoppingList = [];
  };
  calculateShoppingList(ingredients) {

    if(!this.shoppingList[0]){
     ingredients.forEach(ingredient => {
       this.shoppingList.push(ingredient);
     });
    } else {
     this.shoppingList.forEach(item => {
       ingredients.forEach(ingredient => {
         if(item.id === ingredient.id){
           item.quantity.amount += ingredient.quantity.amount;
         };
       });
     });
   };
    this.userPantry.forEach(stock => {
      this.shoppingList.forEach(item => {
        if(item.id === stock.ingredient && item.quantity.amount <= stock.amount) {
          this.shoppingList.splice(this.shoppingList.indexOf(item), 1);
        } else if(item.id === stock.ingredient && item.quantity.amount > stock.amount) {
          item.quantity.amount -= stock.amount;
        };
      });
    });
  };

removeStockFromPantry(recipe, currentUserId) {
  this.userPantry.forEach(stock => {
    recipe.ingredients.forEach(ingredient => {
      if(stock.ingredient === ingredient.id) {
        stock.amount -= ingredient.quantity.amount;
        (0,_scripts__WEBPACK_IMPORTED_MODULE_0__.postIngredient)(currentUserId, stock.ingredient, ingredient.quantity.amount, 'subb');
      };
    });
  });
};

removeFromShoppingList(recipe){
  recipe.ingredients.forEach(ingredient => {
    this.shoppingList.forEach(item => {
       if(item.id === ingredient.id){
         this.shoppingList.splice(this.shoppingList.indexOf(item));
       };
    });
  });
};

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pantry);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "domUpdates": () => (/* binding */ domUpdates)
/* harmony export */ });
const domUpdates = {

  list: null,
  elements: null,
  pantry: null,
  recipe: null,


  displayElement(hide, show)  {
    hide.map((element) => {
      element.classList.add('hidden');
    });
  show.classList.remove('hidden');
  },

  makeList(recipe, method) {
    if(method === 'ingredient'){
      var list = recipe.getIngredients(domUpdates.list);
      var displayList = list.reduce((string, ingredient) => {
      string += `<li class="recipe-select-ingredient">${ingredient}</li>`;
      return string;
      }, " ");
      } else if(method === 'instructions'){
      var list = recipe.getInstructions();
      var displayList = list.reduce((string, instruction) => {
      string += `<li class="instruction">${instruction}</li>`;
      return string;
      }, " ");
    };
    return displayList;
  },

  showRecipes(recipeInfo, ingredients) {
    let renderer = " ";
      recipeInfo.recipes.map(recipe => {
      const ingredientList = domUpdates.makeList(recipe, "ingredient");
      renderer +=
      `<section class="recipe-select-box">
        <h1 class="recipe-select-name">${recipe.name}</h1>
        <div class="recipe-content-box">
          <img class="recipe-pic" src="${recipe.image}" alt="Recipe image">
          <ul class="recipe-select-ingredients">
            ${ingredientList}
          </ul>
        </div>
        <button onclick="domUpdates.displayElement(domUpdates.elements, domUpdates.elements[2]);domUpdates.formatRecipeCard(event.target.classList.value);" id="view-recipe-btn" class="${recipe.name}">View Recipe</button>
      </section>`;
    domUpdates.elements[4].innerHTML = renderer;
    });
  },

  formatRecipeCard(event) {
    let currentRecipe = assignCurrentRecipe(event);
    const ingredientList = domUpdates.makeList(currentRecipe, 'ingredient');
    const instructionList = domUpdates.makeList(currentRecipe, 'instructions');
    const price = currentRecipe.getCostOfIngredients(domUpdates.list);
    let renderer = "";
    const card =
    `<h1 class="recipe-title">${currentRecipe.name}</h1>
    <section class="recipe-card">
      <header>
        <p class="card-section-title">Ingredients:</p>
      </header>
      <article class="ingredients-section">
        <ul class="recipe-card-ingredients">
          ${ingredientList}
        </ul>
      </article>
      <section class="cost-info-section">
        <p class="recipe-cost">Ingredient Cost: ${price}</p>
      </section>
      <p class="card-section-title">Instructions:</p>
      <article class="instructions">
        <ol class="instructions-list">
          ${instructionList}
        </ol>
      </article>
      </section>
      <section class="save-buttons">
        <button onclick="domUpdates.pantry.calculateShoppingList(domUpdates.recipe.ingredients);saveRecipe(event.target.innerText);renderPantry(domUpdates.elements[5], domUpdates.pantry.userPantry);renderPantry(domUpdates.elements[6], domUpdates.pantry.shoppingList)"
        class="recipes-to-save-btn">Add To Saved Recipes</button>
        <button onclick="saveRecipe(event.target.innerText)"
        class="recipes-to-save-btn">Add To Favorites</button>
      </section>`;
    renderer = card;
    domUpdates.elements[2].innerHTML = renderer;
  },

  renderRecipes(recipes, location, string) {
    let stringify = JSON.stringify(string);
    location.innerHTML = '';
    recipes.map((recipe) => {
    location.innerHTML +=
    `<section class="saved-recipe-box">
       <p onclick="assignCurrentRecipe(event.target.innerText);formatRecipeCard(event.target.innerText);domUpdates.displayElement(domUpdates.elements, domUpdates.elements[2]);" class="list-item">${recipe.name}</p>
       <img onclick='deleteRecipe(event, ${stringify})' class="trashcan" src='images/delete.png'/>
     </section>`;
   });
  },

  renderPantry(location, list) {
    location.innerHTML = '';
    if (list === domUpdates.pantry.shoppingList) {
      domUpdates.pantry.shoppingList.map((item) => {
        domUpdates.list.forEach(ingredient => {
          if (item.id === ingredient.id) {
                location.innerHTML += `<li>${ingredient.name} - ${item.quantity.amount} units</li>`;
          };
        });
      });
    };
    list.map((item) => {
      domUpdates.list.forEach(ingredient => {
        if (item.ingredient === ingredient.id) {
          location.innerHTML += `<li>${ingredient.name} - ${item.amount} units</li>`;
        };
      });
    });
  },

  needMoreStockError(event) {
    event.target.innerText = "Need more ingredients. Check shopping list";
  }

};
window.needMoreStockError = domUpdates.needMoreStockError;

window.domUpdates = domUpdates;

window.renderPantry = domUpdates.renderPantry;

window.renderShoppingList = domUpdates.renderShoppingList;

window.showRecipeCard = domUpdates.showRecipeCard;

window.formatRecipeCard = domUpdates.formatRecipeCard;




/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map