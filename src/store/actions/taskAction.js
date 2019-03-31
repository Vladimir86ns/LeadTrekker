import {
  CREATE_TASK,
  DELETE_TASK
} from './types';

/**
 * Redux action to to create task.
 */
export const createTask = (task) => ({
  type: CREATE_TASK,
  payload: { task }
});

/**
 * Redux action to delete task.
 */
export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: { taskId }
});