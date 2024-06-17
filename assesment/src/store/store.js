import {configureStore} from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { depApi } from "./api/depApi";
import {userReducer} from "./reducer/userReducer";


export const server = import.meta.env.VITE_SERVER

export const store = configureStore({
    reducer: {
        [depApi.reducerPath]: depApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [userReducer.name]: userReducer.reducer,
    },
    middleware: (mid) => [
        ...mid(),
        depApi.middleware,
        userApi.middleware,
    ]
})