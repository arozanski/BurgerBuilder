import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.ORDER_BURGER_FAIL: return updateObject(state, { loading: false });
        case actionTypes.ORDER_BURGER_START: return updateObject(state, { loading: true });
        case actionTypes.ORDER_BURGER_INIT: return updateObject(state, { purchased: false });
        case actionTypes.FETCH_ORDERS_START: return updateObject(state, { loading: true });
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {
                orders: action.orders,
                loading: false
            });
        case actionTypes.FETCH_ORDERS_FAIL: return updateObject(state, { loading: false });
        default:
            return state;
    }
}

export default reducer;