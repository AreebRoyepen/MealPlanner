import { TOGGLE_FAVORITE, SET_FILTERS, GET_RECIPES, ADD_TO_GROCERIES, ADD_TO_INGREDIENTS_LIST, EDIT_INGREDIENTS_LIST } from '../actions/recipes';

const initialState = {
  recipes: new Array(0),
  filteredRecipes: new Array(0),
  favoriteRecipes: new Array(0),
  selectedRecipes: new Array(0),
  ingredientsList: new Array(0)
};

const recipesReducer = (state = initialState, action) => {

  switch (action.type) {

    case GET_RECIPES:
      return{
        ...state, recipes: action.recipes
      }

    case ADD_TO_GROCERIES:

      let currentSelectedRecipes = [...state.selectedRecipes]    
      
      return { ...state, selectedRecipes: currentSelectedRecipes.concat(action.recipe) };

    case ADD_TO_INGREDIENTS_LIST:

      let newList = [];

      action.ingredients.forEach((incomingListItem) => {
        if (
          state.ingredientsList.findIndex((currentListItem) => {
            if (
              currentListItem.ingredient == incomingListItem.ingredient &&
              currentListItem.quantity == incomingListItem.quantity &&
              currentListItem.checked === true
            ) {
              return true;
            }
          }) > -1
        ) {
          newList.push({ ...incomingListItem, checked: true });
        } else {
          newList.push(incomingListItem);
        }
      });

      return {...state , ingredientsList:  newList }

    case EDIT_INGREDIENTS_LIST:

      return {...state , ingredientsList:  action.ingredients }

    case TOGGLE_FAVORITE:

      const temp = state.favoriteRecipes
      const existingIndex = temp.findIndex(
        recipe => recipe.id === action.id
      );
      
      if (existingIndex >= 0) {
        const updatedFavMeals = [...temp];
        updatedFavMeals.splice(existingIndex, 1);
        return { ...state, favoriteRecipes: updatedFavMeals };
      } else {
        const recipe = state.recipes.find(recipe => recipe.id === action.id);
        return { ...state, favoriteRecipes: temp.concat(recipe) };
      }

    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredRecipes = state.meals.filter(meal => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegetarian && !meal.isVegetarian) {
          return false;
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }
        return true;
      });
      return { ...state, filteredRecipes: updatedFilteredRecipes };

    default:
      return state;
  }
};

export default recipesReducer;
