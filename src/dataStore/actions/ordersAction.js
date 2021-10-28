import axiosConfig from '../../config/axios';
import {
    GET_ORDERS,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_ERROR,
    CREATE_ORDER,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_ERROR,
    GET_ORDER,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR,
    DELETE_ORDER,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_ERROR,
    UPDATE_ORDER,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_ERROR
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
            console.log(response);
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
        type: CREATE_ORDER
    });

    axiosConfig
        .post(`/orders`, credentials, {
            headers: {
                'x-toprated-token': localStorage.token,
            },
        })
        .then(response => {
            dispatch({
                type: CREATE_ORDER_SUCCESS,
                orders: response.data,
            });
        })
        .catch(error => {
            dispatch({
                type: CREATE_ORDER_ERROR,
                errorMessage: error.response.data.error_message,
            });
        })
        .catch(() => {
            dispatch({
                type: CREATE_ORDER_ERROR,
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

export const deleleOrder = (dispatch, orderID) => {
    dispatch({
        type: DELETE_ORDER,
    });
    axiosConfig
        .delete(`/orders/${orderID}`, {
            headers: {
                'x-toprated-token': localStorage.token,
            },
        })
        .then(response => {
            dispatch({
                type: DELETE_ORDER_SUCCESS,
                order: response.data,
                orderId: orderID,
            })
        })
        .catch(error => {
            dispatch({
                type: DELETE_ORDER_ERROR,
                errorMessage: error.response.data.message,
            });
        })
        .catch(() => {
            dispatch({
                type: DELETE_ORDER_ERROR,
                errorMessage:
                    'Lost connection to the server. Kindly check your internet connection',
            });
        });
};

export const updateOrder = (dispatch, orderID, bodyData) => {
    dispatch({
        type: UPDATE_ORDER,
    });
    axiosConfig
        .put(`/orders/${orderID}`, bodyData, {
            headers: {
                'x-toprated-token': localStorage.token,
            },
        })
        .then(response => {
            dispatch({
                type: UPDATE_ORDER_SUCCESS,
                order: response.data,
                orderId: orderID,
            })
        })
        .catch(error => {
            dispatch({
                type: UPDATE_ORDER_ERROR,
                errorMessage: error.response.data.message,
            });
        })
        .catch(() => {
            dispatch({
                type: UPDATE_ORDER_ERROR,
                errorMessage:
                    'Lost connection to the server. Kindly check your internet connection',
            });
        });
};