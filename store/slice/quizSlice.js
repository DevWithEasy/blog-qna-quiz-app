import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        subject: '',
        score : 0 
    },
    reducers: {
        addSubject:(state,action)=>{
            state.subject = action.payload;
        },
        totalScore:(state,action)=>{
            state.score = action.payload;
        }
    }
})
export const {name, totalScore} = quizSlice.actions
export default quizSlice.reducer
