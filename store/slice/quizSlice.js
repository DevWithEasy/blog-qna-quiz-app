import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        category: {},
        score : 0 
    },
    reducers: {
        category :(state,action)=>{
            state.category = action.payload
        },
        
        totalScore:(state,action)=>{
            state.score = action.payload;
        }
    }
})
export const {category, totalScore} = quizSlice.actions
export default quizSlice.reducer
