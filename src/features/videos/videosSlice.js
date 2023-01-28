import { getVideos } from "./videoAPI";
const {createSlice, createAsyncThunk} = require("@reduxjs/toolkit");

//Step 1 : Initial State declare;

const initialState = {
    videos : [],
    isLoading : false,
    isError : false,
    error : "",
};

//Step 2 : asyc thunk create [for data fatch from database by API]

export const fatchVideo = createAsyncThunk("videos/fetchVideos", async() => {

    const videos = await getVideos();
    return videos;
});

//Data Handleing

const videoSlice = createSlice({
    name: "videos",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fatchVideo.pending, (state) => {

                state.isError = false;
                state.isLoading = true;
                
            })

            .addCase(fatchVideo.fulfilled, (state, action)=>{
                
                state.isLoading = false;
                state.videos = action.payload;
            })
            .addCase(fatchVideo.rejected,(state,action) => {

                state.isLoading = false,
                state.videos = [],
                state.isError = true,
                state.error = action.error?.message
            })
    },
});

export default videoSlice.reducer;