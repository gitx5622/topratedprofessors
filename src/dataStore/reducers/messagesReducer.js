import {LIST_MESSAGES, LIST_MESSAGES_ERROR, LIST_MESSAGES_SUCCESS} from "../dispatchTypes";

export const initialLanguagesState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    messages: [],
    message:{}
}

export const messagesReducers = (
    state = initialLanguagesState,
    action
) => {
    switch (action.type) {
        case LIST_MESSAGES: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case LIST_MESSAGES_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                languages: action.languages,
            };
        }
        case LIST_MESSAGES_ERROR: {
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