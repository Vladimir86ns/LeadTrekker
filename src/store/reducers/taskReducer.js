import { TASKS } from '../../shared/MockData/Tasks/tasks';
import { clone, remove } from 'lodash';

import {
  CREATE_TASK,
  DELETE_TASK
} from '../actions/types';

const initialState = {
  tasks: clone(TASKS)
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK:
    let allTasks = clone(state.tasks);
    allTasks.push(action.payload.task)
      return {
        ...state,
        tasks: allTasks
      };

    case DELETE_TASK:
      let tasks = clone(state.tasks);
      return {
        ...state,
        tasks: remove(tasks, e => e.id !== action.payload.taskId)
      };

    default:
      return state;
  }
};

export default reducer;