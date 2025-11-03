import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: UserState = {
    accessToken: localStorage.getItem("accessToken") as string | null,
    refreshToken: localStorage.getItem("refreshToken") as string | null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (
            state,
            action: PayloadAction<{ accessToken: string; refreshToken?: string }>
        ) => {
            const { accessToken, refreshToken } = action.payload;
            state.accessToken = accessToken;
            if (refreshToken) {
                state.refreshToken = refreshToken;
            }
            localStorage.setItem("accessToken", accessToken);
            if (refreshToken) {
                localStorage.setItem("refreshToken", refreshToken);
            }
        },
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        },
    },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;