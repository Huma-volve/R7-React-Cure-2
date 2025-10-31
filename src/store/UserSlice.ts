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
interface User {
    fullname: string;
    email: string;
    loading: boolean;
    error: string | null;
}
const UserData: User = {
    fullname: '',
    email: '',
    loading: false,
    error: null
}
export const signup = createAsyncThunk(
    'user/signup',
    async (data: User, { rejectWithValue }) => {
        try {
            const response = await axios.post("https://api.example.com/auth/signup", data);
            return response.data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }

)
export const phoneNumber = createAsyncThunk(
    "user/phoneNumber",
    async (phoneNumber: string, { rejectWithValue }) => {
        try {
            const response = await axios.post("https://api.example.com/auth/send-otp", { phoneNumber });
            return response.data; // usually { success: true, message: "OTP sent" }
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

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
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string | null;
            })
            .addCase(phoneNumber.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(phoneNumber.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(phoneNumber.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string | null;
            })

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
