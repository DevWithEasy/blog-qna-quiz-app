import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import blogSlice from "./slice/blogSlice";
import qnaSlice from "./slice/qnaSlice";
import quizSlice  from "./slice/quizSlice";

const rootReducer =combineReducers({
    auth : authSlice,
    blog : blogSlice,
    quiz : quizSlice,
    qna : qnaSlice,
})

export default rootReducer;
