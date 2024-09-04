import { combineReducers } from "redux";
import authReducer from "./authReducer";
import todoReducer from "./todoReducer";
import { themeReducer } from "./themeReducer";

const rootReducer = combineReducers({
    auth : authReducer,
    todo : todoReducer,
    theme : themeReducer
})

export default rootReducer;