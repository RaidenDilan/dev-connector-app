import { TEST_DISPATCH } from './types';
// Register User
const registerUser = userData => ({
  type: TEST_DISPATCH,
  payload: userData
});

export default registerUser;