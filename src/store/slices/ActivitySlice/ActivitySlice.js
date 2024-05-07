import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getActivityRequest } from "../../../services/ActivityServices";

const getActivity = createAsyncThunk('getActivity', async ({take, skip, telegramId}) => {
    const response = await getActivityRequest(take, skip, telegramId);
    return response;
})

const initialState = {
    isLoading: false,
    activities: [],
    count: 0,
};

const activitySlice = createSlice({
    name: 'activitySlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getActivity.pending, state => {
            state.isLoading = true;
        })
        builder.addCase(getActivity.rejected, state => {
            state.isLoading = false;
        })
        builder.addCase(getActivity.fulfilled, (state, action) => {
            state.activities = [...action.payload.items];
            state.count = action.payload.count;
            state.isLoading = false;
        })
    }
});

export const ActivityReducer = activitySlice.reducer;

export const ActivityActions = {...activitySlice.actions};
export const ActivityEffects = {
    getActivity,
};
