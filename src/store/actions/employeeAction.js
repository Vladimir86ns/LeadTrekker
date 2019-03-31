import {
  ADD_NEW_EMPLOYEE,
  UPDATE_EMPLOYEE,
  REMOVE_EMPLOYEE,
  SELECT_EMPLOYEE,
  UN_SELECT_EMPLOYEE
} from './types';

/**
 * Redux action to add new employee.
 */
export const addNewEmployee = (employee, history) => ({
  type: ADD_NEW_EMPLOYEE,
  payload: { employee, history }
});

/**
 * Redux action to update employee.
 */
export const updateEmployee = (employee, history) => ({
  type: UPDATE_EMPLOYEE,
  payload: { employee, history }
});

/**
 * Redux action to remove employee.
 */
export const removeEmployee = (employeeId) => ({
  type: REMOVE_EMPLOYEE,
  payload: { employeeId }
});

/**
 * Redux action to select employee.
 */
export const selectEmployee = (employee) => ({
  type: SELECT_EMPLOYEE,
  payload: { employee }
});

/**
 * Redux action to un select employee.
 */
export const unSelectEmployee = (employee) => ({
  type: UN_SELECT_EMPLOYEE,
  payload: { employee }
});
