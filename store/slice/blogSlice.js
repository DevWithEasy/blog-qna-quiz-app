import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        blog : {} 
    },
    reducers: {
        currentBlog:(state,action)=>{
           state.blog = action.payload;
        },
        like:(state,action)=>{
            const newBlog = {...state.blog};
            newBlog.likes.push(action.payload)
            state.blog = newBlog;
        },
        dislike:(state,action)=>{
            const newBlog = {...state.blog}
            const newLike = newBlog.likes.filter(like => like !== action.payload)
            const final = {...newBlog,likes:newLike}
            state.blog = final
        }
    }
})
export const {currentBlog,like,dislike} = blogSlice.actions
export default blogSlice.reducer