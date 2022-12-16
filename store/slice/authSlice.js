import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        user : {} 
    },
    reducers: {
        signinAccount:(state,action)=>{
            state.isAuth = true;
            state.user = action.payload;
        },
        signout:(state,action)=>{
            state.isAuth = false;
            state.user = {};
        }
    }
})
export const {signinAccount, signout} = authSlice.actions
export default authSlice.reducer