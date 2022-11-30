import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        name: '',
        score : 0 
    },
    reducers: {
        name:(state,action)=>{
            state.name = action.payload;
        },
        totalScore:(state,action)=>{
            state.score = action.payload;
        }
    }
})
export const {name, totalScore} = quizSlice.actions
export default quizSlice.reducer
