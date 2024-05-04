import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getActivityRequest } from "../../../services/ActivityServices";

const getActivity = createAsyncThunk('getActivity', async (take, skip, telegramId) => {
    const response = await getActivityRequest(take, skip, telegramId);
    return response;
})

const initialState = {
    isLoading: false,
    telegramId: null,
    action: null,
    createdAt: null,
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
            state.telegramId = action.payload.telegramId;
            state.action = action.payload.action;
            state.createdAt = action.payload.createdAt;
            state.isLoading = false;
        })
    }
});

export const ActivityReducer = activitySlice.reducer;

export const ActivityActions = {...activitySlice.actions};
export const ActivityEffects = {

};
