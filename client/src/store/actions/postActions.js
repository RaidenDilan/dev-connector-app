import axios from 'axios';
import {
  ADD_POST,
  POST_LOADING,
  GET_ERRORS,
  GET_POSTS,
  DELETE_POST
} from './types';

// Post loading
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Add post
export const addPost = postData => dispatch => {
  axios
    .post('/api/posts', postData)
    .then(res => dispatch({
      type: ADD_POST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Get posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/posts')
    .then(res => dispatch({
      type: GET_POSTS,
      payload: res.data
    }))
    .catch(() => dispatch({
      type: GET_POSTS,
      payload: null
    }));
};

// Delete post
export const deletePost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .delete(`/api/posts/${ id }`)
    .then(() => dispatch({
      type: DELETE_POST,
      payload: id
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Add Like
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${ id }`)
    .then(() => dispatch(getPosts()))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${ id }`)
    .then(() => dispatch(getPosts()))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};