import axiosConfig from '../../config/axios';
import { LIST_MESSAGES, LIST_MESSAGES_ERROR, LIST_MESSAGES_SUCCESS } from "dataStore/dispatchTypes";


export const filterMessages = async (dispatch, order_number) => {
    dispatch({
        type: LIST_MESSAGES,
    });
    try {
        return await axiosConfig
            .get(`/orders/${order_number}/messages`,{
                headers: {
                    'x-toprated-token': localStorage.token,
                },
            })
            .then(response => {
                dispatch({
                    type: LIST_MESSAGES_SUCCESS,
                    messages: response.data,
                })
                console.log(response)
                return response;
            });
    } catch (error) {
        dispatch({
            type: LIST_MESSAGES_ERROR,
            errorMessage: error.response,
        });

        return error.response;
    }
};

export const createMessage = async (dispatch, rating) => {
    dispatch({
        type: CREATE_USER_RATINGS,
    });
    try {
        return await axiosConfig
            .post('/ratings', rating, {
                headers: {
                    'x-toprated-token': localStorage.token,
                },
            })
            .then(response => {
                dispatch({
                    type: CREATE_USER_RATINGS_SUCCESS,
                    rating: response.data,
                })
                console.log(response)
                return response;
            });
    } catch (error) {
        dispatch({
            type: CREATE_USER_RATINGS_ERROR,
            errorMessage: error.response,
        });

        return error.response;
    }
};