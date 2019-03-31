/**
 * Root Sagas
 */
import { all } from 'redux-saga/effects';

// sagas
import authSagas from './authSagas';
import employeeSaga from './employeeSage';
import userSaga from './userSagas';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    employeeSaga(),
    userSaga()
  ]);
}
