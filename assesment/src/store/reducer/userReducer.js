import { createSlice } from "@reduxjs/toolkit";



export const userReducer = createSlice({
    name: "userReducer",
    initialState: {
        user: localStorage.getItem("user") ?? null,
        user: localStorage.getItem("role") ?? null,
        token: localStorage.getItem("token") ?? null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.token = action.payload?.token;
            localStorage.setItem("user", action.payload?.name);
            localStorage.setItem("role", action.payload?.role);
            localStorage.setItem("token", action.payload?.token);
        },
        logout: (state, action) => {
            state.user = action.payload;
            state.token = action.payload?.token;
            localStorage.clear()
        }
    }
});

export const {loginSuccess, logout} = userReducer.actions;

export const selectAuthToken = (state) => state.userReducer?.token;