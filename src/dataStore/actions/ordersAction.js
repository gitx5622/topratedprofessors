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
    UPDATE_ORDER_ERROR,
    GET_COMPLETED_ORDERS,
    GET_COMPLETED_ORDERS_SUCCESS,
    GET_COMPLETED_ORDERS_ERROR,
    GET_APPROVED_ORDERS,
    GET_APPROVED_ORDERS_SUCCESS,
    GET_APPROVED_ORDERS_ERROR,
    GET_REJECTED_ORDERS,
    GET_REJECTED_ORDERS_SUCCESS,
    GET_REJECTED_ORDERS_ERROR,
    GET_CANCELLED_ORDERS,
    GET_CANCELLED_ORDERS_SUCCESS,
    GET_CANCELLED_ORDERS_ERROR,
    GET_PENDING_ORDERS,
    GET_PENDING_ORDERS_SUCCESS,
    GET_PENDING_ORDERS_ERROR,
    GET_ACTIVE_ORDERS,
    GET_ACTIVE_ORDERS_SUCCESS,
    GET_ACTIVE_ORDERS_ERROR,
    GET_WAITING_ASSIGN_ORDERS,
    GET_WAITING_ASSIGN_ORDERS_SUCCESS,
    GET_WAITING_ASSIGN_ORDERS_ERROR
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

export const getCompletedOrders = (dispatch, userId) => {
    dispatch({
        type: GET_COMPLETED_ORDERS,
    });
    axiosConfig
        .get(`/users/${userId}/orders?completed_status=true`, {
            headers: {
                'x-toprated-token': localStorage.token,
            },
        })
        .then(response => {
            console.log(response);
            dispatch({
                type: GET_COMPLETED_ORDERS_SUCCESS,
                orders: response.data,
            });
        })
        .catch(error => {
            dispatch({
                type: GET_COMPLETED_ORDERS_ERROR,
                errorMessage: error.response.data.error_message,
            });
        })
        .catch(() => {
            dispatch({
                type: GET_COMPLETED_ORDERS_ERROR,
                errorMessage:
                    'Lost connection to the server. Kindly check your internet connection',
            });
        });
};

export const getRejectedOrders = (dispatch, userId) => {
    dispatch({
        type: GET_REJECTED_ORDERS,
    });
    axiosConfig
        .get(`/users/${userId}/orders?rejected_status=true`, {
            headers: {
                'x-toprated-token': localStorage.token,
            },
        })
        .then(response => {
            console.log(response);
            dispatch({
                type: GET_REJECTED_ORDERS_SUCCESS,
                orders: response.data,
            });
        })
        .catch(error => {
            dispatch({
                type: GET_REJECTED_ORDERS_ERROR,
                errorMessage: error.response.data.error_message,
            });
        })
        .catch(() => {
            dispatch({
                type: GET_REJECTED_ORDERS_ERROR,
                errorMessage:
                    'Lost connection to the server. Kindly check your internet connection',
            });
        });
};

export const getCancelledOrders = (dispatch, userId) => {
    dispatch({
        type: GET_CANCELLED_ORDERS,
    });
    axiosConfig
        .get(`/users/${userId}/orders?cancelled_status=true`, {
            headers: {
                'x-toprated-token': localStorage.token,
            },
        })
        .then(response => {
            console.log(response);
            dispatch({
                type: GET_CANCELLED_ORDERS_SUCCESS,
                orders: response.data,
            });
        })
        .catch(error => {
            dispatch({
                type: GET_CANCELLED_ORDERS_ERROR,
                errorMessage: error.response.data.error_message,
            });
        })
        .catch(() => {
            dispatch({
                type: GET_CANCELLED_ORDERS_ERROR,
                errorMessage:
                    'Lost connection to the server. Kindly check your internet connection',
            });
        });
};

export const getPendingOrders = (dispatch, userId) => {
    dispatch({
        type: GET_PENDING_ORDERS,
    });
    axiosConfig
        .get(`/users/${userId}/orders?pending_status=true`, {
            headers: {
                'x-toprated-token': localStorage.token,
            },
        })
        .then(response => {
            console.log(response);
            dispatch({
                type: GET_PENDING_ORDERS_SUCCESS,
                orders: response.data,
            });
        })
        .catch(error => {
            dispatch({
                type: GET_PENDING_ORDERS_ERROR,
                errorMessage: error.response.data.error_message,
            });
        })
        .catch(() => {
            dispatch({
                type: GET_PENDING_ORDERS_ERROR,
                errorMessage:
                    'Lost connection to the server. Kindly check your internet connection',
            });
        });
};

export const getApprovedOrders = (dispatch, userId) => {
    dispatch({
        type: GET_APPROVED_ORDERS,
    });
    axiosConfig
        .get(`/users/${userId}/orders?approval_status=true`, {
            headers: {
                'x-toprated-token': localStorage.token,
            },
        })
        .then(response => {
            console.log(response);
            dispatch({
                type: GET_APPROVED_ORDERS_SUCCESS,
                orders: response.data,
            });
        })
        .catch(error => {
            dispatch({
                type: GET_APPROVED_ORDERS_ERROR,
                errorMessage: error.response.data.error_message,
            });
        })
        .catch(() => {
            dispatch({
                type: GET_APPROVED_ORDERS_ERROR,
                errorMessage:
                    'Lost connection to the server. Kindly check your internet connection',
            });
        });
};

export const getWaitingAssignOrders = (dispatch, userId) => {
    dispatch({
        type: GET_WAITING_ASSIGN_ORDERS,
    });
    axiosConfig
        .get(`/users/${userId}/orders?available_status=true`, {
            headers: {
                'x-toprated-token': localStorage.token,
            },
        })
        .then(response => {
            console.log(response);
            dispatch({
                type: GET_WAITING_ASSIGN_ORDERS_SUCCESS,
                orders: response.data,
            });
        })
        .catch(error => {
            dispatch({
                type: GET_WAITING_ASSIGN_ORDERS_ERROR,
                errorMessage: error.response.data.error_message,
            });
        })
        .catch(() => {
            dispatch({
                type: GET_WAITING_ASSIGN_ORDERS_ERROR,
                errorMessage:
                    'Lost connection to the server. Kindly check your internet connection',
            });
        });
};

export const getActiveOrders = (dispatch, userId) => {
    dispatch({
        type: GET_ACTIVE_ORDERS,
    });
    axiosConfig
        .get(`/users/${userId}/orders?active_status=true`, {
            headers: {
                'x-toprated-token': localStorage.token,
            },
        })
        .then(response => {
            console.log(response);
            dispatch({
                type: GET_ACTIVE_ORDERS_SUCCESS,
                orders: response.data,
            });
        })
        .catch(error => {
            dispatch({
                type: GET_ACTIVE_ORDERS_ERROR,
                errorMessage: error.response.data.error_message,
            });
        })
        .catch(() => {
            dispatch({
                type: GET_ACTIVE_ORDERS_ERROR,
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