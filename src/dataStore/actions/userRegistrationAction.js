import axiosConfig from '../../config/axios';

import { LOADING, SUCCESS, ERROR } from '../dispatchTypes';

export const RegisterUser = (dispatchRegisterUser, bodyData) => {
    dispatchRegisterUser({
        type: LOADING,
    });

    try {
        axiosConfig
            .post('/register', bodyData, {
                headers: {
                    'X-TOPRATED-TOKEN': localStorage.token,
                },
            })
            .then(response => {
                localStorage.activeUser = JSON.stringify({
                    user: response.data,
                });
                dispatchRegisterUser({
                    type: SUCCESS,
                });
            })
            .catch(error => {
                if (error.response.status === 401) {
                    dispatchRegisterUser({
                        type: ERROR,
                        errorMessage:
                            'Your session has been invalidated. Kindly login or verify your number again',
                    });
                } else if (error.response.status === 409) {
                    dispatchRegisterUser({
                        type: ERROR,
                        errorMessage:
                            'Username has already been taken, kindly pick another one',
                    });
                } else {
                    dispatchRegisterUser({
                        type: ERROR,
                        errorMessage: error.response.data.error_message,
                    });
                }
            })
            .catch(() => {
                dispatchRegisterUser({
                    type: ERROR,
                    errorMessage: 'Failed to process request. Check internet connection',
                });
            });
    } catch (error) {
        dispatchRegisterUser({
            type: ERROR,
            errorMessage: 'Something went wrong, try again later!',
        });
    }
};
