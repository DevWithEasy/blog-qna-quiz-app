import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import quizSlice  from "./slice/quizSlice";

const rootReducer =combineReducers({
    auth : authSlice,
    quiz : quizSlice
})

export default rootReducer;
