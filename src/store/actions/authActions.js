import {
  REGISTER_USER,
  LOGIN_USER
} from './types';

/**
 * Redux action to register user to firebase.
 */
export const registerUserInFB = (user, history) => ({
  type: REGISTER_USER,
  payload: { user, history }
});

/**
 * Redux action to login user with firebase.
 */
export const loginUser = (user, history) => ({
  type: LOGIN_USER,
  payload: { user, history }
});