import { configureStore } from "@reduxjs/toolkit";
import chatReducer from './chatSlice.ts';
import userReducer from './userSlice.ts';

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        user: userReducer
    }
})

export type IRootState = ReturnType<typeof store.getState>