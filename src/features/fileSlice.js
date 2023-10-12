import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import host from "./host";
export const getFile = createAsyncThunk(
    "file/getFile",
    async (payload, thunkAPI) => {
        const currentToken = localStorage.getItem("_ur_d_r");
        const { data } = await axios({
            method: "get",
            url: host+'/drive/ids/main',
            headers: {
                'authorization': `Bearer ${currentToken}`,
            },
            data: payload,
        })
        return data;
    }
);
export const addFile = createAsyncThunk(
    "file/addFile",
    async (payload, {dispatch}) => {
        const currentToken = localStorage.getItem("_ur_d_r");
        let formdata=new FormData();
        for(let i=0;i<payload.images.length;i++) {
            formdata.append('images',payload.images[i])
        }
        formdata.append('user',payload.id)
        formdata.append('dir',payload.dir)
        formdata.append('directoryId',payload.directoryId)
        await axios({
            method: "post",
            url: host+'/drive/ids/main',
            headers: {
                'authorization': `Bearer ${currentToken}`,
            },
            data: formdata,
        })
        dispatch(getFile());
        window.location.replace('/')
        return
    }
);
export const getDir = createAsyncThunk(
    "file/getDir",
    async (payload, thunkAPI) => {
        const currentToken = localStorage.getItem("_ur_d_r");
        const { data } = await axios({
            method: "get",
            url: host+'/drive/ids/dir',
            headers: {
                'authorization': `Bearer ${currentToken}`,
            },
            data: payload,
        })
        return data;
    }
);
export const addDir = createAsyncThunk(
    "file/addDir",
    async (payload, {dispatch}) => {
        const currentToken = localStorage.getItem("_ur_d_r");
        const response=await axios({
            method: "post",
            url: host+'/drive/ids/dir',
            headers: {
                'authorization': `Bearer ${currentToken}`,
            },
            data: payload,
        })
        dispatch(getFile());
        dispatch(getDir());
        return response.data
    }
);
export const deleteDir = createAsyncThunk(
    "file/deleteDir",
    async (payload, {dispatch}) => {
        const currentToken = localStorage.getItem("_ur_d_r");
        const response=await axios({
            method: "delete",
            url: host+'/drive/ids/dir',
            headers: {
                'authorization': `Bearer ${currentToken}`,
            },
            data: payload,
        })
        // dispatch(getFile());
        dispatch(getDir());
        return response.data
    }
);
export const renameDir = createAsyncThunk(
    "file/renameDir",
    async (payload, {dispatch}) => {
        const currentToken = localStorage.getItem("_ur_d_r");
        const response=await axios({
            method: "put",
            url: host+'/drive/ids/dir',
            headers: {
                'authorization': `Bearer ${currentToken}`,
            },
            data: payload,
        })
        // dispatch(getFile());
        dispatch(getDir());
        return response.data
    }
);
export const downloadFile = createAsyncThunk(
    "file/downloadFile",
    async (payload, {dispatch}) => {
        const currentToken = localStorage.getItem("_ur_d_r");
        const {data}=await axios({
            method: "get",
            url: host+'/drive/ids/download',
            headers: {
                'authorization': `Bearer ${currentToken}`,
            },
            responseType: 'blob',
            params: payload,
        })
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', payload.originalname);
        document.body.appendChild(link);
        link.click();
        return
    }
);
export const moveFile = createAsyncThunk(
    "file/moveFile",
    async (payload, {dispatch}) => {
        const currentToken = localStorage.getItem("_ur_d_r");
        await axios({
            method: "put",
            url: host+'/drive/ids/main',
            headers: {
                Authorization: `Bearer ${currentToken}`,
            },
            data: payload,
        })
        dispatch(getFile());
        return 
    }
);
export const moveDirectory = createAsyncThunk(
    "file/moveDirectory",
    async (payload, {dispatch}) => {
        const currentToken = localStorage.getItem("_ur_d_r");
        await axios({
            method: "put",
            url: host+'/drive/ids/dir/move',
            headers: {
                Authorization: `Bearer ${currentToken}`,
            },
            data: payload,
        })
        dispatch(getDir());
        return 
    }
);
export const deleteFile = createAsyncThunk(
    "file/deleteFile",
    async (payload, {dispatch}) => {
        const currentToken = localStorage.getItem("_ur_d_r");
        await axios({
            method: "delete",
            url: host+'/drive/ids/main',
            headers: {
                Authorization: `Bearer ${currentToken}`,
            },
            data: payload,
        })
        dispatch(getFile());
        return 
    }
);
const fileSlice = createSlice({
    name: "file",
    initialState: {
        files: [],
        isLoading: false,
        error: null,
        dir: null,
    },
    extraReducers:{
        [getFile.fulfilled]:(state,action)=>{
            state.files = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        [getFile.pending]:(state,action)=>{
            state.isLoading = true;
            state.error = null;
        },
        [getFile.rejected]:(state,action)=>{
            state.isLoading = false;
            state.error = action.error;
        },
        [getDir.fulfilled]:(state,action)=>{
            state.dir = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        [getDir.pending]:(state,action)=>{
            state.isLoading = true;
            state.error = null
        },
        [getDir.rejected]:(state,action)=>{
            state.isLoading = false;
            state.error = action.error;
        },
        [addFile.pending]:(state,action)=>{
            state.isLoading = true;
            state.error = null;
        },
        [addFile.fulfilled]:(state,action)=>{
            state.isLoading = false;
            state.error = null;
        },
        [addFile.rejected]:(state,action)=>{
            state.isLoading = false;
            state.error = action.error;
        },
        [deleteFile.pending]:(state,action)=>{
            state.isLoading = true;
            state.error = null;
        },
        [deleteFile.fulfilled]:(state,action)=>{
            state.isLoading = false;
            state.error = null;
        },
        [deleteFile.rejected]:(state,action)=>{
            state.isLoading = false;
            state.error = action.error;
        },
        [addDir.pending]:(state,action)=>{
            state.isLoading = true;
            state.error = null;
        },
        [addDir.fulfilled]:(state,action)=>{
            state.isLoading = false;
            state.error = null;
        },
        [addDir.rejected]:(state,action)=>{
            state.isLoading = false;
            state.error = action.error;
        },

    }
})
export default fileSlice.reducer;