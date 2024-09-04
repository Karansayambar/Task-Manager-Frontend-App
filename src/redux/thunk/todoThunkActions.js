import { endOfToday, isWithinInterval, startOfToday } from "date-fns";
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
    const response = await fetch(`${"https://taskmanagerbackend-xrer.onrender.com"}/todo/read-todo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      credentials: "include", // This tells the browser to include cookies in the request
    }); // Replace with your API endpoint

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

export const createTodo = (todoData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_TODO_REQUEST });
    try {
    const response = await fetch(`${"https://taskmanagerbackend-xrer.onrender.com"}/todo/create-todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(todoData),
        credentials: "include",
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
      console.log(data);
      dispatch({ type: CREATE_TODO_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({ type: CREATE_TODO_FAILURE, payload: error.message });
    }
  };
};

export const changeStatusOfIsImportant =
  (todoID, status, tasks) => async (dispatch) => {
    try {
      let data;
      if (tasks.length) {
        data = tasks.map((element) => {
          if (element._id === todoID) {
            element.isImportant = !status;
            return element;
          }
          // Return the unmodified element if the condition does not match
          return element;
        });

        dispatch({ type: CHANGE_IS_IMPORTANT, payload: data });
      }
      const response = await fetch(
        `${"https://taskmanagerbackend-xrer.onrender.com"}/todo/changeImportanceStatus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            todoId: todoID,
            status: !status,
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.log(response);
        return;
      }

      return;
      // console.log(data)
    } catch (error) {
      console.log(error);
      return;
    }
  };

export const changeStatusOfIsCompleted =
  (todoID, status, tasks) => async (dispatch) => {
    console.log(status);
    try {
      if (!status) {
        let temp = tasks.filter((todo) => todo._id === todoID);
        const filteredTask = tasks.filter((todo) => todo._id !== todoID);
        let filteredTodo = temp[0];
        filteredTodo.isCompleted = true;
        const data = [...filteredTask, filteredTodo];

        dispatch({ type: CHANGE_IS_COMPLETED, payload: data });
        //
      }
      const response = await fetch(
        `${"https://taskmanagerbackend-xrer.onrender.com"}/todo/changeCompletedStatus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            todoId: todoID,
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.log(response);
        return;
      }

      return;
      //   // console.log(data)
    } catch (error) {
      console.log(error);
      return;
    }
  };

export const updateTodo = (task, todoId, dueDate, tasks) => {
  const filteredTask = tasks.map((element) => {
    if (element._id === todoId) {
      element.task = task;
      element.dueDate = dueDate ? dueDate : new Date();
      return element;
    }
    // Return the unmodified element if the condition does not match
    return element;
  });

  return async (dispatch) => {
    dispatch({ type: EDIT_TASK, payload: filteredTask });
    try {
      const response = await fetch(`${"https://taskmanagerbackend-xrer.onrender.com"}/todo/edit-todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          task,
          dueDate,
          todoId,
        }),
        credentials: "include",
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
    console.log(data);
    dispatch({ type: DELETE_TASK, payload: data });
    try {
      const response = await fetch(`${"https://taskmanagerbackend-xrer.onrender.com"}/todo/delete-todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          todoId,
        }),
        credentials: "include",
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
    // Get today's date
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    // Filter tasks to get only those due today
    const data = globalTasks.filter((task) => {
      const taskDueDate = new Date(task.dueDate);
      return taskDueDate >= startOfToday && taskDueDate < endOfToday;
    });

    // Dispatch filtered tasks to Redux store
    dispatch({ type: FILTER_IMPORTANT, payload: data });
  };
};


export const filterAllData = (globalTasks) => {
  return async (dispatch) => {
    dispatch({ type: FILTER_IMPORTANT, payload: globalTasks });
  };
};
