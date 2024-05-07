import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMessageResponseRequest, getMessagesRequest, sendMessageRequest } from "../../../services/MessagesServices";

const getMessages = createAsyncThunk('getMessages', async ({telegramId, messageType, isReaded, take, skip}) => {
    const response = await getMessagesRequest(telegramId, messageType, isReaded, take, skip);
    return response;
});

const getMessageResponse = createAsyncThunk('getMessageResponse', async (messageId) => {
    const reponse = await getMessageResponseRequest(messageId);
    return reponse;
});

const sendMessage = createAsyncThunk('sendMessage', async ({message, messageId}) => {
    await sendMessageRequest(message, messageId);
});

// TODO: Add get message response data
const initialState = {
    isLoading: false,
    messages: [],
    count: 0,
    responseMessage: null,
};

const messagesSlice = createSlice({
    name: 'messagesSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getMessages.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(getMessages.rejected, state => {
            state.isLoading = false;
        });
        builder.addCase(getMessages.fulfilled, (state, action) => {
            state.messages = [...action.payload.items];
            state.count = action.payload.count;
            state.isLoading = false;
        });
        builder.addCase(getMessageResponse.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(getMessageResponse.rejected, state => {
            state.isLoading = false;
        });
        builder.addCase(getMessageResponse.fulfilled, (state, action) => {
            state.responseMessage = {...action.payload};
            state.isLoading = false;
        });
        builder.addCase(sendMessage.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(sendMessage.rejected, state => {
            state.isLoading = false;
        });
    },
});

export const MessagesReducer = messagesSlice.reducer;

export const MessagesActions = {...messagesSlice.actions};
export const MessagesEffects = {
    getMessages,
    getMessageResponse,
    sendMessage,
};
