import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';


const cookies = Cookies;

interface UserState {
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: UserState = {
    accessToken: cookies.get("accessToken") as string | null,
    refreshToken: cookies.get("refreshToken") as string | null
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
            cookies.set("accessToken", accessToken);
            if (refreshToken) {
                cookies.set("refreshToken", refreshToken);
            }
        },
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
        },
    },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;