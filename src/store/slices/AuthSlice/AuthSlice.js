import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authorizeRequest } from "../../../services/AuthServices";

const authorize = createAsyncThunk('authorize', async ({name, password}) => {
    const response = await authorizeRequest(name, password);
    return response;
});

const initialState = {
    isLoading: false,
    isAuthorized: false,
    accessToken: undefined,
    validTo: undefined,
    validFrom: undefined,
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(authorize.pending, state => {
            state.isLoading = true;
        })
        builder.addCase(authorize.rejected, state => {
            state.isLoading = false;
        })
        builder.addCase(authorize.fulfilled, (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.validTo = action.payload.validTo;
            state.validFrom = action.payload.validFrom;
            state.isAuthorized = true;
            state.isLoading = false;
        })
    }
})

export const AuthReducer = authSlice.reducer;

export const AuthActions = {...authSlice.actions};
export const AuthEffects = {
    authorize,
}; 
