import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type User = {
    name: string,
    email: string
}

const initialState = {
    name: '',
    email: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: { 
        addUser: (state, action: PayloadAction<User>) => {
            const { name, email } = action.payload;
            state.name = name;
            state.email = email;
        },
        removeUser: (state) => {
            state.name = '';
            state.email = '';
        }
    }
})

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;