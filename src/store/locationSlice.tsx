// store/locationSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface LocationState {
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: LocationState = {
  address: null,
  latitude: null,
  longitude: null,
  loading: false,
  error: null,
};

// ✅ Fetch user profile (address)
export const fetchUserProfile = createAsyncThunk(
  "location/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("accessToken");
      const res = await axios.get(
        "https://cure-doctor-booking.runasp.net/api/Profile/EditProfile/getprofile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to fetch profile");
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocationManually: (state, action) => {
      const { address, latitude, longitude } = action.payload;
      state.address = address;
      state.latitude = latitude;
      state.longitude = longitude;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload;
        state.address = data?.address || null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLocationManually } = locationSlice.actions;
export default locationSlice.reducer;
