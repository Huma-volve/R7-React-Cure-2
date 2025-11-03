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

// 🔹 Register user
export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (userData: any, { rejectWithValue }) => {
        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/users", userData);
            return response.data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// 🔹 Login user
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (userData: any, { rejectWithValue }) => {
        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/login", userData);
            return response.data;
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
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string | null;
            })

            // ✅ Login cases
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string | null;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
