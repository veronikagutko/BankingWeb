import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrdersRequest, setOrderCompleteRequest } from "../../../services/OrdersServices";

const getOrders = createAsyncThunk('getOrders', async ({take, skip}) => {
    const orders = await getOrdersRequest(take, skip);
    return orders;
});

const setOrderComplete = createAsyncThunk('setOrderComplete', async ({id}) => {
    await setOrderCompleteRequest(id);
});

const initialState = {
    orders: [],
    count: 0,
    isLoading: false,
}

const ordersSlice = createSlice({
    name: 'ordersSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOrders.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getOrders.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.orders = [...action.payload.items];
            state.count = action.payload.count;
            state.isLoading = false;
        });
    }
});

export const OrdersReducer = ordersSlice.reducer;

export const OrdersActions = {...ordersSlice.actions};
export const OrdersEffects = {
    getOrders,
    setOrderComplete,
};
