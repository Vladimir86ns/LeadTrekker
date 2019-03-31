import { clone, findIndex, remove } from 'lodash';
import { EMPLOYEES } from '../../shared/MockData/Employees/employees';

import {
  ADD_NEW_EMPLOYEE,
  UPDATE_EMPLOYEE,
  REMOVE_EMPLOYEE,
  SELECT_EMPLOYEE,
  UN_SELECT_EMPLOYEE,
} from '../actions/types';

// this is mock data for employees
const initialState = {
  employees: clone(EMPLOYEES),
  selectedEmployee: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_EMPLOYEE:
      let allEmployees = clone(state.employees);
      let newEmployee = action.payload.employee;
      newEmployee.id = Math.floor(Date.now() / 100);
      allEmployees.push(newEmployee)
      return {
        ...state,
        employees: allEmployees
      };

    case UPDATE_EMPLOYEE:
      let index = findIndex(state.employees, employee => employee.id === action.payload.employee.id )
      let clonedEmployees = clone(state.employees);
      clonedEmployees[index] = action.payload.employee;

      return {
        ...state,
        employees: clonedEmployees
      };

    case REMOVE_EMPLOYEE:
      let employees = clone(state.employees);
      return {
        ...state,
        employees: remove(employees, e => e.id !== action.payload.employeeId)
      };

    case SELECT_EMPLOYEE:
      return {
        ...state,
        selectedEmployee: action.payload.employee
      };

    case UN_SELECT_EMPLOYEE:
      return {
        ...state,
      selectedEmployee: {}
      };

    default:
      return state;
  }
};

export default reducer;