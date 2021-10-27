import {
    MAKE_PAYMENT_ERROR,
    MAKE_PAYMENT_SUCCESS,
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
        default:
            return state;
    }

};