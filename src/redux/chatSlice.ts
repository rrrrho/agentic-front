import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Chat = {
    threadId: string,
    title: string,
    isNew: boolean
}

const initialState = {
    threadId: '',
    title: '',
    isNew: false
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: { addChat: (state, action: PayloadAction<Chat>) => {
        const { threadId, title, isNew } = action.payload;
        state.threadId = threadId;
        state.title = title;
        state.isNew = isNew
    } }
})

export const { addChat } = chatSlice.actions;
export default chatSlice.reducer;