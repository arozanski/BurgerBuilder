import * as actionTypes from '../actions/actionTypes';

const initState = {
    order: [],
    loading: false,
    purchased: false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderID
            };
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.order.concat(newOrder)
            };
        case actionTypes.ORDER_BURGER_FAIL:
            return {
                ...state,
                loading: false
            };
        case actionTypes.ORDER_BURGER_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.ORDER_BURGER_INIT:
            return {
                ...state,
                purchased: false
            };
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            };
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

export default reducer;