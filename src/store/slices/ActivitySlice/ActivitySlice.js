import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getActivityRequest, getStatisticsRequest } from "../../../services/ActivityServices";

const getActivity = createAsyncThunk('getActivity', async ({take, skip, telegramId}) => {
    const response = await getActivityRequest(take, skip, telegramId);
    return response;
});

const getStatistics = createAsyncThunk('getStatistics', async () => {
    const response = getStatisticsRequest();
    return response;
});

const initialState = {
    isLoading: false,
    activities: [],
    count: 0,
    statistics: {
        items: [],
        isLoading: false,
    },
};

const activitySlice = createSlice({
    name: 'activitySlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getActivity.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(getActivity.rejected, state => {
            state.isLoading = false;
        });
        builder.addCase(getActivity.fulfilled, (state, action) => {
            state.activities = [...action.payload.items];
            state.count = action.payload.count;
            state.isLoading = false;
        });
        builder.addCase(getStatistics.pending, (state) => {
            state.statistics.isLoading = true;
        });
        builder.addCase(getStatistics.rejected, (state) => {
            state.statistics.isLoading = false;
        });
        builder.addCase(getStatistics.fulfilled, (state, action) => {
            state.statistics.items = [...action.payload];
            state.statistics.isLoading = false;
        });
    }
});

export const ActivityReducer = activitySlice.reducer;

export const ActivityActions = {...activitySlice.actions};
export const ActivityEffects = {
    getActivity,
    getStatistics,
};
