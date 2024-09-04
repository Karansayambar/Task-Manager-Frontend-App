import { addTask, deleteTask } from "./action";
import {
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  CHANGE_STATUS,
  CHANGE_PRIORITY,
} from "./actions";

// Thunk for adding a task
export const registerUser = (task) => async (dispatch) => {
  try {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await response.json();
    dispatch(addTask(data));
    localStorage.setItem(
      "tasks",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("tasks") || "[]"),
        data,
      ])
    );
  } catch (error) {
    console.error("Failed to add task:", error);
  }
};
