import axiosConfig from '../../config/axios';
import {
    GET_ORDERS,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_ERROR,
    CREATE_ORDERS,
    CREATE_ORDERS_SUCCESS,
    CREATE_ORDERS_ERROR,
    GET_ORDER,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR,
} from '../dispatchTypes';

export const getOrders = (dispatch, userId) => {
    dispatch({
        type: GET_ORDERS,
    });
    axiosConfig
        .get(`/users/${userId}/orders`, {
            headers: {
                'x-toprated-token': localStorage.token,
            },
        })
        .then(response => {
            dispatch({
                type: GET_ORDERS_SUCCESS,
                orders: response.data,
            });
        })
        .catch(error => {
            dispatch({
                type: GET_ORDERS_ERROR,
                errorMessage: error.response.data.error_message,
            });
        })
        .catch(() => {
            dispatch({
                type: GET_ORDERS_ERROR,
                errorMessage:
                    'Lost connection to the server. Kindly check your internet connection',
            });
        });
};

export const createOrders = (dispatch, credentials) => {
    dispatch({
        type: CREATE_ORDERS
    });

    axiosConfig
        .post(`/orders`, credentials, {
            headers: {
                'x-toprated-token': localStorage.token,
            },
        })
        .then(response => {
            dispatch({
                type: CREATE_ORDERS_SUCCESS,
                orders: response.data,
            });
        })
        .catch(error => {
            dispatch({
                type: CREATE_ORDERS_ERROR,
                errorMessage: error.response.data.error_message,
            });
        })
        .catch(() => {
            dispatch({
                type: CREATE_ORDERS_ERROR,
                errorMessage:
                    'Lost connection to the server. Kindly check your internet connection',
            });
        });
}

export const getOrder = (dispatch, orderID) => {
    dispatch({
        type: GET_ORDER,
    });
    axiosConfig
        .get(`/orders/${orderID}`, {
            headers: {
                'x-toprated-token': localStorage.token,
            },
        })
        .then(response => {
            dispatch({
                type: GET_ORDER_SUCCESS,
                order: response.data,
            })
        })
        .catch(error => {
            dispatch({
                type: GET_ORDER_ERROR,
                errorMessage: error.response.data.error_message,
            });
        })
        .catch(() => {
            dispatch({
                type: GET_ORDER_ERROR,
                errorMessage:
                    'Lost connection to the server. Kindly check your internet connection',
            });
        });
};
