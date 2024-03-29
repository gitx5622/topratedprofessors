import {
  CREATE_BLOG,
  CREATE_BLOGS_ERROR,
  CREATE_BLOGS_SUCCESS,
  DELETE_BLOG,
  DELETE_BLOG_ERROR,
  DELETE_BLOG_SUCCESS,
  GET_BLOGS,
  GET_BLOGS_ERROR,
  GET_BLOGS_SUCCESS,
  GET_BLOG,
  GET_BLOG_ERROR,
  GET_BLOG_SUCCESS,
  UPDATE_BLOG,
  UPDATE_BLOGS_ERROR,
  UPDATE_BLOGS_SUCCESS,
} from "../dispatchTypes";

export const initialLanguagesState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: "",
  blogs: [],
  blog: {},
};

export const blogReducers = (state = initialLanguagesState, action) => {
  switch (action.type) {
    case GET_BLOGS: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case GET_BLOGS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        blogs: action.blogs,
      };
    }
    case GET_BLOGS_ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case GET_BLOG: {
        return {
          ...state,
          isError: false,
          isLoading: true,
        };
      }
      case GET_BLOG_SUCCESS: {
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          blog: action.blog,
        };
      }
      case GET_BLOG_ERROR: {
        return {
          ...state,
          isError: true,
          isSuccess: false,
          isLoading: false,
          errorMessage: action.errorMessage,
        };
      }
    case CREATE_BLOG: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case CREATE_BLOGS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        blog: action.blog,
      };
    }
    case CREATE_BLOGS_ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case UPDATE_BLOG: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case UPDATE_BLOGS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        blog: action.blog,
      };
    }
    case UPDATE_BLOGS_ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case DELETE_BLOG: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case DELETE_BLOG_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        blog: action.blog,
      };
    }
    case DELETE_BLOG_ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    default:
      return state;
  }
};
