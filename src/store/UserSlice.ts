import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    token: null as string | null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.token = null;
        },
    },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
