import * as api from '../api';
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from '../constants/actionTypes.js';

const handleDispatch = async (dispatch, actionType, actionCallback) => {
  try {
    const { data } = await actionCallback();
    dispatch({ type: actionType, payload: data });
  } catch (error) {
    console.error(error.message);
  }
};

export const getPosts = () => async (dispatch) => {
  handleDispatch(dispatch, FETCH_ALL, api.fetchPosts);
};

export const createPost = (post) => async (dispatch) => {
  handleDispatch(dispatch, CREATE, () => api.createPost(post));
};

export const updatePost = (id, post) => async (dispatch) => {
  handleDispatch(dispatch, UPDATE, () => api.updatePost(id, post));
};

export const deletePost = (id) => async (dispatch) => {
  handleDispatch(dispatch, DELETE, () => api.deletePost(id));
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  
  const actionCallback = () => api.likePost(id, user?.token);

  handleDispatch(dispatch, LIKE, actionCallback);
};

