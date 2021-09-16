import {
    GET_ORDER,
    GET_ORDER_ERROR,
    GET_ORDER_SUCCESS,
    GET_ORDERS,
    GET_ORDERS_ERROR,
    GET_ORDERS_SUCCESS
} from "../dispatchTypes";

export const initialOrdersState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    orders: {
        orders: [],
        pagination: {}
    },
    order: {},
}

export const ordersReducers = (
    state = initialOrdersState,
    action
) => {
    switch (action.type) {
        case GET_ORDERS: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case GET_ORDERS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                orders: action.orders,
            };
        }
        case GET_ORDERS_ERROR: {
            return {
                ...state,
                isError: true,
                isSuccess: false,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        }
        case GET_ORDER: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                order: action.order,
            };
        }
        case GET_ORDER_ERROR: {
            return {
                ...state,
                isError: true,
                isSuccess: false,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        }
        default:
            return state
    }

};