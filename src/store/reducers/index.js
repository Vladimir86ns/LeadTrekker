import { combineReducers } from 'redux';
import userReducer from './userReducer';
import employeeReducer from './employeeReducer';
import taskReducer from './taskReducer';
import contactReducer from './contactReducer';

const reducers = combineReducers({
  userReducer,
  employeeReducer,
  taskReducer,
  contactReducer
});

export default reducers;
