import axios from 'axios';

const setAuthToken = token => {
  if (token) axios.defaults.headers.common.Authorization = token; // apply to every request
  else delete axios.defaults.headers.common.Authorization; // Delete auth header
};

export default setAuthToken;