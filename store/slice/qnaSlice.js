import { createSlice } from "@reduxjs/toolkit";

const qnaSlice = createSlice({
    name: 'quiz',
    initialState: {
        questions: [],
        currentQna: {}
    },
    reducers: {
        allQuestion : (state,action)=>{
            state.questions = action.payload
        },
        currentQuestion : (state, action)=>{
            state.currentQna = action.payload
        }
    }
})
export const {allQuestion,currentQuestion} = qnaSlice.actions
export default qnaSlice.reducer
