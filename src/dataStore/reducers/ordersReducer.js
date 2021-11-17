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
    UPDATE_ORDER_ERROR,
    GET_COMPLETED_ORDERS,
    GET_COMPLETED_ORDERS_SUCCESS,
    GET_COMPLETED_ORDERS_ERROR,
    GET_APPROVED_ORDERS,
    GET_APPROVED_ORDERS_SUCCESS,
    GET_APPROVED_ORDERS_ERROR,
    GET_REJECTED_ORDERS,
    GET_REJECTED_ORDERS_SUCCESS,
    GET_REJECTED_ORDERS_ERROR,
    GET_CANCELLED_ORDERS,
    GET_CANCELLED_ORDERS_SUCCESS,
    GET_CANCELLED_ORDERS_ERROR,
    GET_PENDING_ORDERS,
    GET_PENDING_ORDERS_SUCCESS,
    GET_PENDING_ORDERS_ERROR,
    GET_ACTIVE_ORDERS,
    GET_ACTIVE_ORDERS_SUCCESS,
    GET_ACTIVE_ORDERS_ERROR,
    GET_WAITING_ASSIGN_ORDERS,
    GET_WAITING_ASSIGN_ORDERS_SUCCESS,
    GET_WAITING_ASSIGN_ORDERS_ERROR,
    GET_USER_COUNT_SUMMARY,
    GET_USER_COUNT_SUMMARY_SUCCESS,
    GET_USER_COUNT_SUMMARY_ERROR,
    FILE_UPLOADING,
    FILE_UPLOADING_SUCCESS,
    FILE_UPLOADING_ERROR,
    ORDER_FILES,
    ORDER_FILES_SUCCESS, ORDER_FILES_ERROR

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
    completed_orders: {
        orders: [],
        pagination: {}
    },
    approved_orders: {
        orders: [],
        pagination: {}
    },
    rejected_orders: {
        orders: [],
        pagination: {}
    },
    cancelled_orders: {
        orders: [],
        pagination: {}
    },
    pending_orders: {
        orders: [],
        pagination: {}
    },
    active_orders: {
        orders: [],
        pagination: {}
    },
    waiting_assign: {
        orders: [],
        pagination: {}
    },
    order: {},
    uploaded_files: [],
    order_files: [],
    user_order_count_summary: {}
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
        case GET_COMPLETED_ORDERS: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case GET_COMPLETED_ORDERS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                completed_orders: action.completed_orders,
            };
        }
        case GET_COMPLETED_ORDERS_ERROR: {
            return {
                ...state,
                isError: true,
                isSuccess: false,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        }
        case GET_APPROVED_ORDERS: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case GET_APPROVED_ORDERS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                approved_orders: action.approved_orders,
            };
        }
        case GET_APPROVED_ORDERS_ERROR: {
            return {
                ...state,
                isError: true,
                isSuccess: false,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        }
        case GET_REJECTED_ORDERS: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case GET_REJECTED_ORDERS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                rejected_orders: action.rejected_orders,
            };
        }
        case GET_REJECTED_ORDERS_ERROR: {
            return {
                ...state,
                isError: true,
                isSuccess: false,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        }
        case GET_CANCELLED_ORDERS: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case GET_CANCELLED_ORDERS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                cancelled_orders: action.cancelled_orders,
            };
        }
        case GET_CANCELLED_ORDERS_ERROR: {
            return {
                ...state,
                isError: true,
                isSuccess: false,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        }
        case GET_PENDING_ORDERS: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case GET_PENDING_ORDERS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                pending_orders: action.pending_orders,
            };
        }
        case GET_PENDING_ORDERS_ERROR: {
            return {
                ...state,
                isError: true,
                isSuccess: false,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        }
        case GET_ACTIVE_ORDERS: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case GET_ACTIVE_ORDERS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                active_orders: action.active_orders,
            };
        }
        case GET_ACTIVE_ORDERS_ERROR: {
            return {
                ...state,
                isError: true,
                isSuccess: false,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        }
        case GET_WAITING_ASSIGN_ORDERS: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case GET_WAITING_ASSIGN_ORDERS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                waiting_assign: action.waiting_assign,
            };
        }
        case GET_WAITING_ASSIGN_ORDERS_ERROR: {
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
        case GET_USER_COUNT_SUMMARY: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case GET_USER_COUNT_SUMMARY_SUCCESS: {
            return {
                ...state,
                isSuccess: false,
                isLoading: false,
                user_order_count_summary: action.user_order_count_summary,
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
        case FILE_UPLOADING: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case FILE_UPLOADING_SUCCESS: {
            return {
                ...state,
                isSuccess: false,
                isLoading: false,
                uploaded_files: action.uploaded_files,
            };
        }
        case FILE_UPLOADING_ERROR: {
            return {
                ...state,
                isSuccess: false,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        }
        case ORDER_FILES: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case ORDER_FILES_SUCCESS: {
            return {
                ...state,
                isSuccess: false,
                isLoading: false,
                order_files: action.order_files,
            };
        }
        case ORDER_FILES_ERROR: {
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