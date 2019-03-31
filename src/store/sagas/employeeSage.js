import { all, fork, takeEvery } from 'redux-saga/effects';

import {
  ADD_NEW_EMPLOYEE,
  UPDATE_EMPLOYEE
} from '../actions/types';

/**
 * Create new employee, for now just redirect.
 */
function* createNewEmployeeToServer({ payload }) {
  yield payload.history.push('/all-employees');
}

/**
 * Update employee, for now just redirect.
 */
function* updateEmployeeToServer({ payload }) {
  yield payload.history.push('/all-employees');
}

/**
 * Update employee.
 */
export function* updateEmployee() {
  yield takeEvery(UPDATE_EMPLOYEE, updateEmployeeToServer);
}

/**
 * Add Employee.
 */
export function* addNewEmployee() {
  yield takeEvery(ADD_NEW_EMPLOYEE, createNewEmployeeToServer);
}

/**
 * Employee Root Saga
 */
export default function* rootSaga() {
  yield all([
      fork(addNewEmployee),
      fork(updateEmployee)
  ]);
}