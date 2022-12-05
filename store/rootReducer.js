import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import qnaSlice from "./slice/qnaSlice";
import quizSlice  from "./slice/quizSlice";

const rootReducer =combineReducers({
    auth : authSlice,
    quiz : quizSlice,
    qna : qnaSlice,
})

export default rootReducer;
