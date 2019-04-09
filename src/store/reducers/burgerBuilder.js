import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

// setup initial redux store state
const initialState = {
    ingredients: null,
    totalPrice: 3,
    error: false,
    creatingOrder: false
}

const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 1,
    meat: 1.5,
    bacon: 1.4
}

// initialize root reducer
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                creatingOrder: true
            }
            return updateObject(state, updatedState);
        case actionTypes.REMOVE_INGREDIENT:
            const ingredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            const ingredients = updateObject(state.ingredients, ingredient);
            const newState = {
                ingredients: ingredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                creatingOrder: true
            }
            return updateObject(state, newState);
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 3,
                error: false,
                creatingOrder: false
            });
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { error: true });
        default: return state;
    }
}

export default reducer;