import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import host from "./host";
export const login = createAsyncThunk("auth/login", async (data) => {
    const result = await axios.post(host+"/authentication/login_user", data);
    if(result.data?.token) localStorage.setItem("_ur_d_r", result.data?.token);
    return result.data
})
export const servicesAuth = createAsyncThunk("auth/serviceAuth", async ()=>{
    const currentToken = localStorage.getItem("_ur_d_r");
    if(currentToken){
        let result = await axios({
            method: "GET",
            url:host+"/authentication/services_user",
            headers: {
                'authorization': `Bearer ${currentToken}`,
            },
            params:{role:'drive'}
        });
        if(currentToken===result.data.token){
            localStorage.setItem('_ur_d_r',result.data.token)
            return result.data;
        }
        if(currentToken!==result.data.token){
            localStorage.removeItem('_ur_d_r')
            return {token:null}
        }
    }   
})


const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        user: null,
        loading: false,
        error: null,
        status: null,
        message: null,
    },
    reducers:{
        logout: (state) => {
            localStorage.removeItem('_ur_d_r')
            state.token = null
            state.user = null
            state.loading = false
            state.error = null
            state.status = null
            state.message = null
            window.location.replace('/')
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            state.token = action.payload.token;
            state.user = action.payload.user[0];
            state.status = action.payload.status;
            state.message = action.payload.message;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [servicesAuth.fulfilled]: (state, action) => {
            state.loading = false;
            state.token = action.payload?.token;
            state.user = action.payload?.user;
        },
        [servicesAuth.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    }
})
export const { logout } = authSlice.actions;
export default authSlice.reducer