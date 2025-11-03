import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const base_url = `https://cure-doctor-booking.runasp.net/`;
interface UserState {
    loading: boolean;
    user: any;
    error: string | null;
    data: {
        acssessToken: string | null;
        refreshToken: string | null;
    }
}

const initialState: UserState = {
    loading: false,
    user: null,
    error: null,
    data: {
        acssessToken: "",
        refreshToken: "",
    }
};
interface User {
    fullName: string;
    phoneNumber: string;
    Email: string;
}

export const signup = createAsyncThunk(
    "user/signup",
    async (data: User, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${base_url}api/Identity/Accounts/register`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error.message);
        }
    }
);

interface LoginForm {
    phoneNumber: string
}
export const login = createAsyncThunk(
    "user/login",
    async (data: LoginForm, { rejectWithValue }) => {
        try {
            const response = await axios.post(`https://cure-doctor-booking.runasp.net/api/Identity/Accounts/login`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

interface VerifyOTP {
    phoneNumber: string;
    otpNumber: any;
}
export const verifyOTP = createAsyncThunk(
    "user/verifyOTP",
    async (
        data: VerifyOTP,
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.post(`${base_url}api/Identity/Accounts/verify-login`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const verifyOTPRegister = createAsyncThunk(
    "user/verifyOTPRegister",
    async (data: VerifyOTP, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${base_url}api/Identity/Accounts/verify-register`,
                { ...data }, {
                headers: {
                    "Content-Type": "application/json",
                },
            }
            );
            return response.data; // ← هي فيها success + message + data {access + refresh}
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const googleLogin = createAsyncThunk(
    "user/googleLogin",
    async (token: string, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${base_url}api/Identity/Accounts/google-login`, { token });

            return response.data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const refreshToken = createAsyncThunk(
    "user/refreshToken",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${base_url}api/Identity/Accounts/refresh-token`, null, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${base_url}api/Identity/Accounts/logout`, null, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
)



const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

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
            .addCase(verifyOTPRegister.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOTPRegister.fulfilled, (state, action) => {
                state.loading = false;
                state.data.acssessToken = action.payload.data.accessToken;
                state.data.refreshToken = action.payload.data.refreshToken;
                localStorage.setItem("accessToken", action.payload.data.accessToken);
                localStorage.setItem("refreshToken", action.payload.data.refreshToken);
            })
            .addCase(verifyOTPRegister.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string | null;
            })

            .addCase(verifyOTP.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.data.acssessToken = action.payload.data.refreshToken;
                state.loading = false;
                state.user = action.payload.user;
                state.error = null;
                localStorage.setItem("accessToken", action.payload.data.accessToken);
                localStorage.setItem("refreshToken", action.payload.data.refreshToken);
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

export default userSlice.reducer;
