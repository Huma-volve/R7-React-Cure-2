import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// register user
export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            // لاحظ إننا بنبعت البيانات مش id
            const response = await axios.post("https://jsonplaceholder.typicode.com/users", userData);
            return response.data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: null,
        error: null,
    },
    reducers: {},
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
            });
    },
});

export default userSlice.reducer;
