import axiosConfig from '../../config/axios';
import {
    MAKE_PAYMENT,
    MAKE_PAYMENT_SUCCESS,
    MAKE_PAYMENT_ERROR,
} from '../dispatchTypes';

export const makePayment= async (dispatch, bodyData) => {
    dispatch({
        type: MAKE_PAYMENT,
    });
    try {
        return await axiosConfig.post('/make_payment', bodyData,{
            headers: {
                'x-toprated-token': localStorage.token,
            }
            }).then(response => {
            
            dispatch({
                type: MAKE_PAYMENT_SUCCESS,
            });

            return response;
        });
    } catch (error) {
        dispatch({
            type: MAKE_PAYMENT_ERROR,
            errorMessage: error.response.data.message,
        });

        return error.response;
    }
};


