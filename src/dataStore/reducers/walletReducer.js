import {
    EXECUTE_PAYMENT_SUCCESS,
    EXECUTE_PAYMENT_ERROR,
    MAKE_PAYMENT_ERROR,
    MAKE_PAYMENT_SUCCESS,
    GET_ORDERS,
    MAKE_PAYMENT,
    EXECUTE_PAYMENT,
    GET_USER_WALLET_SUMMARY,
    GET_USER_WALLET_SUMMARY_SUCCESS, GET_USER_COUNT_SUMMARY_ERROR,
} from "../dispatchTypes";

export const initialOrdersState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    results: {},
    user_wallet_summary: {}
}

export const walletReducer = (
    state = initialOrdersState,
    action
) => {
    switch (action.type) {
        case GET_USER_WALLET_SUMMARY: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case GET_USER_WALLET_SUMMARY_SUCCESS: {
            return {
                ...state,
                isSuccess: true,
                isLoading: false,
                user_wallet_summary: action.user_wallet_summary,
            };
        }
        case GET_USER_COUNT_SUMMARY_ERROR: {
            return {
                ...state,
                isSuccess: false,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        }
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
                isLoading: false,
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