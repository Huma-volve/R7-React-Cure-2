import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Types
interface Doctor {
  id: number;
  fullName: string;
  about: string;
  imgUrl: string;
  specialityId: number;
  specialistTitle: string;
  address: string;
  rating: number;
  distance: number | null;
  isFavourite: boolean;
  price: number;
  startDate: string | null;
  endDate: string | null;
}

interface DoctorState {
  doctors: Doctor[];
  currentDoctor: Doctor | null;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: DoctorState = {
  doctors: [],
  currentDoctor: null,
  loading: false,
  error: null,
};

// Async Thunks
export const fetchDoctors = createAsyncThunk(
  'doctor/fetchDoctors',
  async (_, { rejectWithValue }) => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYjQ3YmU1OC1hMzIzLTQzNTYtYTJjMS05Y2QxZjFiNTIzOGMiLCJ1bmlxdWVfbmFtZSI6IisyMTQ1NjU0MjAwMyIsImZpcnN0TmFtZSI6ImFiZHVsbGFoIiwibGFzdE5hbWUiOiIiLCJhZGRyZXNzIjoiIiwiaW1nVXJsIjoiIiwiYmlydGhEYXRlIjoiMDAwMS0wMS0wMSIsImdlbmRlciI6Ik1hbGUiLCJsb2NhdGlvbiI6IiIsImlzTm90aWZpY2F0aW9uc0VuYWJsZWQiOiJUcnVlIiwiZXhwIjoxNzYyMTg3NzczLCJpc3MiOiJodHRwczovL2N1cmUtZG9jdG9yLWJvb2tpbmcucnVuYXNwLm5ldC8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo1MDAwLGh0dHBzOi8vbG9jYWxob3N0OjU1MDAsaHR0cHM6Ly9sb2NhbGhvc3Q6NDIwMCAsaHR0cHM6Ly9jdXJlLWRvY3Rvci1ib29raW5nLnJ1bmFzcC5uZXQvIn0.VG0weZ-vs8bZ_hbGddjf3dJC_Ls5p95OquJQntS_Nuc";

      const res = await axios.get(
        "https://cure-doctor-booking.runasp.net/api/Customer/Doctors/GetAllDoctors",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      return res.data.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        return rejectWithValue("Unauthorized! Check your token.");
      }
      return rejectWithValue(error.message || "Failed to fetch doctors");
    }
  }
);

export const fetchDoctorById = createAsyncThunk(
  'doctor/fetchDoctorById',
  async (doctorId: number, { rejectWithValue }) => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYjQ3YmU1OC1hMzIzLTQzNTYtYTJjMS05Y2QxZjFiNTIzOGMiLCJ1bmlxdWVfbmFtZSI6IisyMTQ1NjU0MjAwMyIsImZpcnN0TmFtZSI6ImFiZHVsbGFoIiwibGFzdE5hbWUiOiIiLCJhZGRyZXNzIjoiIiwiaW1nVXJsIjoiIiwiYmlydGhEYXRlIjoiMDAwMS0wMS0wMSIsImdlbmRlciI6Ik1hbGUiLCJsb2NhdGlvbiI6IiIsImlzTm90aWZpY2F0aW9uc0VuYWJsZWQiOiJUcnVlIiwiZXhwIjoxNzYyMTc3ODM1LCJpc3MiOiJodHRwczovL2N1cmUtZG9jdG9yLWJvb2tpbmcucnVuYXNwLm5ldC8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo1MDAwLGh0dHBzOi8vbG9jYWxob3N0OjU1MDAsaHR0cHM6Ly9sb2NhbGhvc3Q6NDIwMCAsaHR0cHM6Ly9jdXJlLWRvY3Rvci1ib29raW5nLnJ1bmFzcC5uZXQvIn0.0q5qiw-0pzpgySxiQLGJY4NRyEFj5ez07zHFJF12thk";

      const res = await axios.get(
        `https://cure-doctor-booking.runasp.net/api/Customer/Doctors/DoctorDetails/${doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch doctor");
    }
  }
);

// Slice
const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    setCurrentDoctor: (state, action: PayloadAction<Doctor>) => {
      state.currentDoctor = action.payload;
    },
    clearCurrentDoctor: (state) => {
      state.currentDoctor = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch All Doctors
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Doctor By ID
    builder
      .addCase(fetchDoctorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDoctor = action.payload;
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentDoctor, clearCurrentDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;