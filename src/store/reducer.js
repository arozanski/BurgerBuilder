import * as actionTypes from './actions';

// setup initial redux store state
const initialState = {
    ingredients: {
        salad: 1,
        bacon: 1,
        meat: 1,
        cheese: 1
    },
    totalPrice: 3
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
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        default: return state;
    }
}

export default reducer;