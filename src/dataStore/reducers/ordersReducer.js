import {
    CREATE_ORDER,
    CREATE_ORDER_ERROR,
    CREATE_ORDER_SUCCESS,
    GET_ORDER,
    GET_ORDER_ERROR,
    GET_ORDER_SUCCESS,
    GET_ORDERS,
    GET_ORDERS_ERROR,
    GET_ORDERS_SUCCESS,
    DELETE_ORDER,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_ERROR,
    UPDATE_ORDER,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_ERROR
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
        case CREATE_ORDER: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case CREATE_ORDER_SUCCESS: {
            return {
                ...state,
                isSuccess: true,
                isLoading: false,
                orders: action.orders,
            };
        }
        case CREATE_ORDER_ERROR: {
            return {
                ...state,
                isSuccess: false,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        }
        case DELETE_ORDER: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case DELETE_ORDER_SUCCESS: {
            return {
                ...state,
                isSuccess: false,
                isLoading: false,
                order: action.order,
                orders: state.orders.orders.filter(item => item.id !== action.orderId)
            };
        }
        case DELETE_ORDER_ERROR: {
            return {
                ...state,
                isSuccess: false,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        }
        case UPDATE_ORDER: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case UPDATE_ORDER_SUCCESS: {
            return {
                ...state,
                isSuccess: false,
                isLoading: false,
                order: action.order,
            };
        }
        case UPDATE_ORDER_ERROR: {
            return {
                ...state,
                isSuccess: false,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        }
        default: 
            return state
    }

};