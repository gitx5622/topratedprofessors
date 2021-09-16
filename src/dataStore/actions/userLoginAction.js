import axiosConfig from '../../config/axios';
import {ERROR, LOADING, SUCCESS} from "../dispatchTypes";

export const loginUser = async (dispatch, bodyData) => {
    dispatch({
        type: LOADING,
    });
    try {
        return await axiosConfig.post('/sessions', bodyData).then(response => {
            localStorage.currentUser = JSON.stringify(response.data);
            localStorage.admin = true;
            localStorage.token = response.headers['x-toprated-token'];
            dispatch({
                type: SUCCESS,
            });

            return response;
        });
    } catch (error) {
        let knownErrorStatusCodesResponses = {
            400: "Username and password don't match",
            404: 'Account not registered.',
        };

        dispatch({
            type: ERROR,
            errorMessage:
                knownErrorStatusCodesResponses[error.response.status] ||
                error.response.data.error_message,
        });

        return error.response;
    }
};
