import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./features/fileSlice";
import authReducer from "./features/authSlice";
export default configureStore({
    reducer:{
        auth:authReducer,
        file:fileReducer
    },
    devTools: false
})