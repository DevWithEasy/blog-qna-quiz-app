import { combineReducers } from "@reduxjs/toolkit";
import quizSlice  from "./slice/quizSlice";

const rootReducer =combineReducers({
    quiz : quizSlice
})

export default rootReducer;
