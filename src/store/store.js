import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./slices/AuthSlice/AuthSlice";
import { ActivityReducer } from "./slices/ActivitySlice/ActivitySlice";
import { MessagesReducer } from "./slices/MessagesSlice/MessagesSlice";

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        activity: ActivityReducer,
        messages: MessagesReducer,
    }
})

export default store;