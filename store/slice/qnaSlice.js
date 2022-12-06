import { createSlice } from "@reduxjs/toolkit";

const qnaSlice = createSlice({
    name: 'quiz',
    initialState: {
        questions: [],
        currentQna: {},
        refresh : 0,
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
        },
        refresh :(state, action)=>{
            state.refresh = action.payload
        }
    }
})
export const {allQuestion,currentQuestion,allAnswers,refresh} = qnaSlice.actions
export default qnaSlice.reducer
