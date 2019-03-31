import {
  SET_USER_INFO,
  LOGIN_USER_FAIL,
  RESET_AUTH_FAIL,
  RESET_USER
} from './types';

/**
 * Redux action to set user info.
 */
export const setUserInfo = (user) => ({
  type: SET_USER_INFO,
  payload: { user }
});

/**
 * Redux action to handle login user error.
 */
export const loginUserFail = () => ({
  type: LOGIN_USER_FAIL,
});

/**
 * Redux action to reset auth error.
 */
export const resetAuthFail = () => ({
  type: RESET_AUTH_FAIL,
});

/**
 * Redux action to reset user.
 */
export const resetUser = () => ({
  type: RESET_USER,
});