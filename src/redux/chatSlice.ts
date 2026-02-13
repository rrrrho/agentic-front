import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Chat = {
    threadId: string,
    title: string
}

const initialState = {
    threadId: '',
    title: ''
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: { addChat: (state, action: PayloadAction<Chat>) => {
        const { threadId, title } = action.payload;
        state.threadId = threadId;
        state.title = title;
    } }
})

export const { addChat } = chatSlice.actions;
export default chatSlice.reducer;