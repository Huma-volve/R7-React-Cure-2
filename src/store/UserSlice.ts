// src/redux/slices/userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
    loading: boolean;
    user: any;
    error: string | null;
}

const initialState: UserState = {
    loading: false,
    user: null,
    error: null,
};

// ===================================
// 🔹 Send OTP to user's phone
// ===================================
export const sendOTP = createAsyncThunk(
    "user/sendOTP",
    async (phoneNumber: string, { rejectWithValue }) => {
        try {
            const response = await axios.post("https://api.example.com/auth/send-otp", { phoneNumber });
            return response.data; // usually { success: true, message: "OTP sent" }
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// ===================================
// 🔹 Verify OTP
// ===================================
export const verifyOTP = createAsyncThunk(
    "user/verifyOTP",
    async (
        { phoneNumber, otp }: { phoneNumber: string; otp: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.post("https://api.example.com/auth/verify-otp", {
                phoneNumber,
                otp,
            });
            return response.data; // usually { user, token }
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// ===================================
// 🔹 Google Sign-In
// ===================================
export const googleLogin = createAsyncThunk(
    "user/googleLogin",
    async (token: string, { rejectWithValue }) => {
        try {
            const response = await axios.post("https://api.example.com/auth/google", { token });
            return response.data; // usually { user, token }
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// ===================================
// 🔹 User Slice
// ===================================
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // 🔹 Send OTP
            .addCase(sendOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendOTP.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(sendOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string | null;
            })

            // 🔹 Verify OTP
            .addCase(verifyOTP.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string | null;
            })

            // 🔹 Google Login
            .addCase(googleLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string | null;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
