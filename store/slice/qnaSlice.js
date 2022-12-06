import { createSlice } from "@reduxjs/toolkit";

const qnaSlice = createSlice({
    name: 'quiz',
    initialState: {
        questions: [],
        currentQna: {},
        answers : []
    },
    reducers: {
        allQuestion : (state,action)=>{
            state.questions = action.payload
        },
        currentQuestion : (state, action)=>{
            state.currentQna = action.payload
        },
        allAnswers: (state, action)=>{
            state.answers = action.payload
        }
    }
})
export const {allQuestion,currentQuestion,allAnswers} = qnaSlice.actions
export default qnaSlice.reducer
