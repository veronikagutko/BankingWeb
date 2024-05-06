import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authorizeRequest } from "../../../services/AuthServices";
import { STORAGE_KEYS } from "../../../constants/SessionStorageKeys";

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
    reducers: {
        setAuthorized: (state, action) => {
            state.isAuthorized = action.payload;
        }
    },
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
            sessionStorage.setItem(STORAGE_KEYS.accessToken, state.accessToken);
            sessionStorage.setItem(STORAGE_KEYS.validFrom, new Date(state.validFrom));
            sessionStorage.setItem(STORAGE_KEYS.validTo, new Date(state.validTo));
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
