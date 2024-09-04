import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  CREATE_TODO_REQUEST,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAILURE,
  CHANGE_IS_COMPLETED,
  CHANGE_IS_IMPORTANT,
  EDIT_TASK,
  DELETE_TASK,
  FILTER_IMPORTANT,
} from "../actions/taskAction";


export const fetchAllTasks = () => async (dispatch) => {
  dispatch({ type: FETCH_TASKS_REQUEST });
  try {
    const token = localStorage.getItem('tm-token');

    const response = await fetch("https://taskmanagerbackend-xrer.onrender.com/todo/read-todo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${token}`, // Use backticks
      },
    });

    const data = await response.json();

    if (response.status === 200) {
      dispatch({ type: FETCH_TASKS_SUCCESS, payload: data.data });
    } else {
      throw new Error("Failed to fetch tasks");
    }
  } catch (error) {
    dispatch({
      type: FETCH_TASKS_FAILURE,
      payload: error.message,
    });
  }
};

export const createTodo = (todoData) => async (dispatch) => {
  dispatch({ type: CREATE_TODO_REQUEST });
  try {
    const token = localStorage.getItem('tm-token');

    const response = await fetch("https://taskmanagerbackend-xrer.onrender.com/todo/create-todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Use backticks
      },
      body: JSON.stringify({
        task: todoData.task,
        isImportant: todoData.isImportant,
        dueDate: todoData.dueDate,
        priority: todoData.priority,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch({
        type: CREATE_TODO_FAILURE,
        payload: errorData.message || "Something went wrong",
      });
      return;
    }

    const data = await response.json();
    dispatch({ type: CREATE_TODO_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: CREATE_TODO_FAILURE, payload: error.message });
  }
};

export const changeStatusOfIsImportant = (todoID, status, tasks) => async (dispatch) => {
  try {
    let data;
    if (tasks.length) {
      data = tasks.map((element) => {
        if (element._id === todoID) {
          element.isImportant = !status;
          return element;
        }
        return element;
      });

      dispatch({ type: CHANGE_IS_IMPORTANT, payload: data });
    }
    const token = localStorage.getItem('tm-token');

    const response = await fetch("https://taskmanagerbackend-xrer.onrender.com/todo/changeImportanceStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Use backticks
      },
      body: JSON.stringify({
        todoId: todoID,
        status: !status,
      }),
    });

    if (!response.ok) {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

export const changeStatusOfIsCompleted = (todoID, status, tasks) => async (dispatch) => {
  try {
    if (!status) {
      let temp = tasks.filter((todo) => todo._id === todoID);
      const filteredTask = tasks.filter((todo) => todo._id !== todoID);
      let filteredTodo = temp[0];
      filteredTodo.isCompleted = true;
      const data = [...filteredTask, filteredTodo];

      dispatch({ type: CHANGE_IS_COMPLETED, payload: data });
    }
    const token = localStorage.getItem('tm-token');

    const response = await fetch("https://taskmanagerbackend-xrer.onrender.com/todo/changeCompletedStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Use backticks
      },
      body: JSON.stringify({
        todoId: todoID,
      }),
    });

    if (!response.ok) {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = (task, todoId, dueDate, tasks) => {
  const filteredTask = tasks.map((element) => {
    if (element._id === todoId) {
      element.task = task;
      element.dueDate = dueDate ? dueDate : new Date();
      return element;
    }
    return element;
  });

  return async (dispatch) => {
    dispatch({ type: EDIT_TASK, payload: filteredTask });
    try {
      const token = localStorage.getItem('tm-token') || null;

      const response = await fetch("https://taskmanagerbackend-xrer.onrender.com/todo/edit-todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Use backticks
        },
        body: JSON.stringify({
          task,
          dueDate,
          todoId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        dispatch({
          type: CREATE_TODO_FAILURE,
          payload: errorData.message || "Something went wrong",
        });
        return;
      }
    } catch (error) {
      dispatch({ type: CREATE_TODO_FAILURE, payload: error.message });
    }
  };
};

export const deleteTodo = (todoId, tasks) => {
  return async (dispatch) => {
    const data = tasks.filter((task) => task._id !== todoId);
    dispatch({ type: DELETE_TASK, payload: data });
    try {
      const token = localStorage.getItem('tm-token') || null;

      const response = await fetch("https://taskmanagerbackend-xrer.onrender.com/todo/delete-todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Use backticks
        },
        body: JSON.stringify({
          todoId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        dispatch({
          type: CREATE_TODO_FAILURE,
          payload: errorData.message || "Something went wrong",
        });
        return;
      }
    } catch (error) {
      dispatch({ type: CREATE_TODO_FAILURE, payload: error.message });
    }
  };
};

export const filterImportantData = (globalTasks) => {
  return async (dispatch) => {
    const data = globalTasks.filter((task) => task.isImportant === true);
    dispatch({ type: FILTER_IMPORTANT, payload: data });
  };
};

export const filterTodayData = (globalTasks) => {
  return async (dispatch) => {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const data = globalTasks.filter((task) => {
      const taskDueDate = new Date(task.dueDate);
      return taskDueDate >= startOfToday && taskDueDate < endOfToday;
    });

    dispatch({ type: FILTER_IMPORTANT, payload: data });
  };
};

export const filterAllData = (globalTasks) => {
  return async (dispatch) => {
    dispatch({ type: FILTER_IMPORTANT, payload: globalTasks });
  };
};
