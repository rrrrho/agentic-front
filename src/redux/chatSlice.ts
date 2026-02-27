import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Chat = {
    threadId: string,
    title: string
}

const initialState = {
    threadId: '',
    title: '',
    refreshTrigger: 0
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: { 
        addChat: (state, action: PayloadAction<Chat>) => {
            const { threadId, title } = action.payload;
            state.threadId = threadId;
            state.title = title;
    },
        triggerRefresh: (state) => {
            state.refreshTrigger += 1; 
    },
        removeChat: (state) => {
            state.threadId = '';
            state.title = '';
            state.refreshTrigger += 1;
        }
    }
})

export const { addChat, removeChat, triggerRefresh } = chatSlice.actions;
export default chatSlice.reducer;