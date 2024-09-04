import {
  CHANGE_PRIORITY,
  CHANGE_STATUS,
  CREATE_TODO_FAILURE,
  CREATE_TODO_REQUEST,
  CREATE_TODO_SUCCESS,
  DELETE_TASK,
  EDIT_TASK,
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  CHANGE_IS_IMPORTANT,
  CHANGE_IS_COMPLETED,
  FILTER_IMPORTANT,
  FILTER_TODAY,
  FILTER_ALL
  
} from "../actions/taskAction";

const initialState = {
  tasks: [],
  globalTasks:[],
  loading: false,
  error: null,
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_TASKS_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        tasks: action.payload,
        globalTasks: action.payload };

    case FETCH_TASKS_FAILURE:
      return {
        ...state, 
        loading: false,
        error: action.payload };

    case CREATE_TODO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: [action.payload, ...state.tasks],
        globalTasks: [action.payload, ...state.globalTasks],

      };
    case CREATE_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    
    case DELETE_TASK:
      return {...state, tasks: action.payload, globalTasks: action.payload};
    
    case EDIT_TASK:
      return { ...state, loading: false, tasks: action.payload, globalTasks: action.payload };
    
    case FILTER_IMPORTANT:
        return { ...state, loading: false, tasks: action.payload };
    
    case FILTER_TODAY:
      return { ...state, loading: false, tasks: action.payload };
  
    case FILTER_ALL:
      return { ...state, loading: false, tasks: action.payload };
  
    case CHANGE_STATUS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, status: action.payload.updatedTask.status }
            : task
        ),
      };
    case CHANGE_PRIORITY:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, priority: action.payload.updatedTask.priority }
            : task
        ),
      };
      case CHANGE_IS_IMPORTANT:
        return { ...state, loading: false, tasks: action.payload, globalTasks: action.payload };

      case CHANGE_IS_COMPLETED:
        return { ...state, loading: false, tasks: action.payload, globalTasks: action.payload };
        default:
      return state;
  }
};

export default tasksReducer;
