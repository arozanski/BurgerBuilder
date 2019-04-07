import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const orderBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.ORDER_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const orderBurgerFail = (error) => {
    return {
        type: actionTypes.ORDER_BURGER_FAIL,
        error: error
    }
}

export const orderBurgerStart = () => {
    return {
        type: actionTypes.ORDER_BURGER_START
    }
}

export const orderBurger = (orderData, token) => {
    return dispatch => {
        dispatch(orderBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(orderBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(orderBurgerFail(error));
            });
    }
}

export const orderInit = () => {
    return {
        type: actionTypes.ORDER_BURGER_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json?auth=' + token)
            .then(res => {
                const fetchedOrders = [];

                for (let key in res.data) {
                    
                    fetchedOrders.push({
                        ...res.data[key],
                            id: key
                        });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            }).catch(error => {
                dispatch(fetchOrdersFail(error));
            })
    }
}
