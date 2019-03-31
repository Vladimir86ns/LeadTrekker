import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import axiosFB from '../../axios-fb';
import { firebaseDatabase } from '../../../src/firebase/index';

import {
  REGISTER_USER,
  LOGIN_USER
} from '../actions/types';

/**
 * actions
 */
import {
  loginUserFail,
  setUserInfo
} from '../actions/index';

/**
 * Register user to serve.
 */
function* registerUserToServer({ payload }) {
  let { display_name, email, password } = payload.user.registerUser;
  try {
    const responseAuth = yield call(registerUserRequest, email, password, display_name);

    if (responseAuth.status === 200) {
      const responseRegister = yield call(createUserRequest, display_name, email, password);
      if (responseRegister.status === 200) {
        localStorage.setItem('fb_token', responseAuth.data.idToken);
        localStorage.setItem('user_id', responseRegister.data.name);
        payload.history.push('/my-account');
      }
    } else {
      yield put(loginUserFail());
    }
  } catch (error) {

  }
}

/**
 * Login user with serve.
 */
function* loginUserWithServer({ payload }) {
  let { email, password } = payload.user.loginUser;
  try {
    const response = yield call(loginUserRequest, email, password );
    if (response.status === 200) {
      let user = yield call(getUser);
      yield put(setUserInfo(user));

      localStorage.setItem('fb_token', response.data.idToken);
      payload.history.push('/my-account');
    } else {
      yield put(loginUserFail());
    }
  } catch (error) {

  }
}

/**
 * Get user.
 */
const getUser = async () => {
  let userId = localStorage.getItem('user_id');
  return await firebaseDatabase.ref('user').once('value').then(function(snapshot) {
    return snapshot.val()[userId];
  });
}

/**
 * Register user.
 */
const registerUserRequest = async (email, password, display_name) => {
  const userData = {
    email,
    password,
    displayName: display_name,
    returnSecureToken: true
  }

  return await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB9zP-jKaBfw88gzH7mS8XCSvE5YxYr1BM', userData)
    .then(response => response)
    .catch(err => err);
}

/**
 * Create user.
 */
const createUserRequest = async (display_name, email, password) => {
  const userData = {
    display_name,
    email,
    password
  }

  return await axiosFB.post('/user.json', userData)
    .then(response => response)
    .catch(err => err);
}

/**
 * Login user.
 */
const loginUserRequest = async (email, password) => {
  const userData = {
    email,
    password,
    returnSecureToken: true
  }

  return await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB9zP-jKaBfw88gzH7mS8XCSvE5YxYr1BM', userData)
    .then(response => response)
    .catch(err =>  err);
}

/**
 * Register User to Firebase
 */
export function* registerUser() {
  yield takeEvery(REGISTER_USER, registerUserToServer);
}

/**
 * Login User to Firebase
 */
export function* loginUser() {
  yield takeEvery(LOGIN_USER, loginUserWithServer);
}

/**
 * Auth Root Saga
 */
export default function* rootSaga() {
  yield all([
      fork(registerUser),
      fork(loginUser)
  ]);
}