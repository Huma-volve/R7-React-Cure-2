import { getProfile } from "@/api/profile/profile";
import { createSlice } from "@reduxjs/toolkit";

interface ProfileState {
    data: {
        fullName: string;
        email: string;
        phoneNumber: string;
        address: string;
        birthDate: string;
        imgUrl: string;
    };
    loading: boolean;
    error: string | null;
}

export const initialState: ProfileState = {
    data: {
        fullName: "",
        email: "",
        phoneNumber: "",
        address: "",
        birthDate: "",
        imgUrl: "",
    },
    loading: false,
    error: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default profileSlice.reducer;

export type { ProfileState };