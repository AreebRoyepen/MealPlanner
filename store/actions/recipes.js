import {fetchRecipes} from "../../api/Api";
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const SET_FILTERS = "SET_FILTERS";
export const GET_RECIPES = "GET_RECIPES";
export const ADD_TO_GROCERIES = "ADD_TO_GROCERIES";
export const ADD_TO_INGREDIENTS_LIST = "ADD_TO_INGREDIENTS_LIST";
export const EDIT_INGREDIENTS_LIST = "EDIT_INGREDIENTS_LIST";
export const SET_CALENDAR_ID = "SET_CALENDAR_ID";
export const CHANGE_SETTINGS = "CHANGE_SETTINGS";

export const getRecipes = () => {
  return async (dispatch) => {

    try{
        const response = await fetchRecipes();


    console.log(response.data);

    dispatch({
      type: GET_RECIPES,
      recipes: response.data,
    });
    }catch(error){
        dispatch({
            type: GET_RECIPES,
            recipes: [],
          });
    }
  };
};

export const changeSettings = (list) => {
  return {type: CHANGE_SETTINGS, list, list};
};

export const setCalendarID = (id) => {
  return {type: SET_CALENDAR_ID, id : id };
};

export const addToMyPlanner = (recipe) => {
  return { type: ADD_TO_GROCERIES, recipe: recipe };
};

export const toggleFavorite = (id) => {
  return { type: TOGGLE_FAVORITE, id: id };
};

export const setFilters = (filterSettings) => {
  return { type: SET_FILTERS, filters: filterSettings };
};

export const addToIngredientsList = (x) => {

  return {type: ADD_TO_INGREDIENTS_LIST, ingredients : x};

};

export const editIngredientsList = (x) => {

  return {type: EDIT_INGREDIENTS_LIST, ingredients : x};

};