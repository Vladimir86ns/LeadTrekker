import { all, fork, call, takeEvery } from 'redux-saga/effects';
import { firebaseDatabase } from '../../../src/firebase/index'
import { omit } from 'lodash';

import {
  SET_USER_INFO,
} from '../actions/types';

/**
 * Register user to serve.
 */
function* setUserInfoInDB({ payload }) {
  yield call(setUserInfoInDBRequest, payload.user);
}

/**
 * Set user info.
 */
const setUserInfoInDBRequest = async (user) => {
  let userId = localStorage.getItem('user_id');
  delete user.password;
  delete user.showMessages;
  return await firebaseDatabase.ref('user/' + userId).set(
    user
  );
}

/**
 * Login User to Firebase
 */
export function* setUserInfo() {
  yield takeEvery(SET_USER_INFO, setUserInfoInDB );
}

/**
 * Auth Root Saga
 */
export default function* rootSaga() {
  yield all([
      fork(setUserInfo),
  ]);
}