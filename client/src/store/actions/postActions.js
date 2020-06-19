import axios from 'axios';
import {
  ADD_POST,
  POST_LOADING,
  GET_ERRORS
} from './types';

// Add post
export const addPost = postData => dispatch => {
  axios
    .post('/api/profile', postData)
    .then(res => dispatch({
      type: ADD_POST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: POST_LOADING
  };
};