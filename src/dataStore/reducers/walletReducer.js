import {
    EXECUTE_PAYMENT_SUCCESS,
    EXECUTE_PAYMENT_ERROR,
    MAKE_PAYMENT_ERROR,
    MAKE_PAYMENT_SUCCESS, GET_ORDERS, MAKE_PAYMENT, EXECUTE_PAYMENT,
} from "../dispatchTypes";

export const initialOrdersState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    results: {},
}

export const walletReducer = (
    state = initialOrdersState,
    action
) => {
    switch (action.type) {
        case MAKE_PAYMENT: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case MAKE_PAYMENT_SUCCESS: {
            return {
                ...state,
                isSuccess: true,
                isLoading: false,
                results: action.results,
            };
        }
        case MAKE_PAYMENT_ERROR: {
            return {
                ...state,
                isSuccess: false,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        }
        case EXECUTE_PAYMENT: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case EXECUTE_PAYMENT_SUCCESS: {
            return {
                ...state,
                isSuccess: true,
                isLoading: true,
                results: action.results,
            };
        }
        case EXECUTE_PAYMENT_ERROR: {
            return {
                ...state,
                isSuccess: false,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        }
        default:
            return state;
    }

};