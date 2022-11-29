import axiosConfig from "../../config/axios";
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

export const getBlogs = async (dispatch) => {
  dispatch({
    type: GET_BLOGS,
  });
  try {
    return await axiosConfig
      .get(`/top_articles`)
      .then((response) => {
        console.log(response);
        dispatch({
          type: GET_BLOGS_SUCCESS,
          blogs: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: GET_BLOGS_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const getBlog = async (dispatch, title) => {
  dispatch({
    type: GET_BLOG,
  });
  try {
    return await axiosConfig
      .get(`top_articles/${title}`, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch({
          type: GET_BLOG_SUCCESS,
          blog: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: GET_BLOG_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const createBlog = async (dispatch, credentials) => {
  dispatch({
    type: CREATE_BLOG,
  });
  try {
    return await axiosConfig
      .post(`/top_articles`, credentials, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: CREATE_BLOGS_SUCCESS,
          blog: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: CREATE_BLOGS_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const deleleBlog = async (dispatch, articleID) => {
  dispatch({
    type: DELETE_BLOG,
  });
  try {
    return await axiosConfig
      .delete(`/top_articles/${articleID}`, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: DELETE_BLOG_SUCCESS,
          blogs: response.data,
          blog: articleID,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: DELETE_BLOG_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const updateBlog = async (dispatch, articleID, bodyData) => {
  dispatch({
    type: UPDATE_BLOG,
  });
  try {
    return await axiosConfig
      .put(`/top_articles/2/publish`, bodyData, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: UPDATE_BLOGS_SUCCESS,
          blog: response.data,
          blog: articleID,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: UPDATE_BLOGS_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};
