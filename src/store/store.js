import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./slices/AuthSlice/AuthSlice";
import { ActivityReducer } from "./slices/ActivitySlice/ActivitySlice";

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        activity: ActivityReducer,
    }
})

export default store;