import { configureStore } from "@reduxjs/toolkit";
import chatReducer from './chatSlice.ts';

export const store = configureStore({
    reducer: {
        chat: chatReducer,
    }
})

export type IRootState = ReturnType<typeof store.getState>