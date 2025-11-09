import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '@/api/config/axiosConfig';
import { getDoctorById, getDoctors } from '@/api/services/doctorsService';
import type { DoctorsType, AvailableSlot } from '@/api/doctors/Doctors';

// Types
type Doctor = DoctorsType & {
  availableSlots?: AvailableSlot[];
};

interface BookingData {
  DoctorId: number;
  PatientId: number;
  SlotId: number;
  Amount: number;
  Payment: number;
  Status: number;
  AppointmentAt: string;
}

interface DoctorState {
  doctors: Doctor[];
  currentDoctor: Doctor | null;
  loading: boolean;
  error: string | null;
  bookingLoading: boolean;
  bookingError: string | null;
  bookingSuccess: boolean;
}

// Initial State
const initialState: DoctorState = {
  doctors: [],
  currentDoctor: null,
  loading: false,
  error: null,
  bookingLoading: false,
  bookingError: null,
  bookingSuccess: false,
};

// Async Thunks
export const fetchDoctors = createAsyncThunk(
  'doctor/fetchDoctors',
  async (_, { rejectWithValue }) => {
    try {
      const { doctors } = await getDoctors();
      return doctors as Doctor[];
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || 'Failed to fetch doctors';
      return rejectWithValue(message as string);
    }
  }
);

export const fetchDoctorById = createAsyncThunk(
  'doctor/fetchDoctorById',
  async (doctorId: number, { rejectWithValue }) => {
    try {
      const { doctor } = await getDoctorById(doctorId);
      if (!doctor) {
        return rejectWithValue('Doctor not found');
      }
      return doctor as Doctor;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || 'Failed to fetch doctor';
      return rejectWithValue(message as string);
    }
  }
);


export const createBooking = createAsyncThunk(
  'doctor/createBooking',
  async (bookingData: BookingData, { rejectWithValue }) => {
    try {
      console.log("📤 Sending booking data:", bookingData);

      const res = await apiClient.post(
        '/Customer/Booking/CreateBooking',
        bookingData
      );

      console.log("✅ Booking Created:", res.data);
      return res.data;
    } catch (error: any) {
      console.error("❌ Full Error:", error);
      console.error("❌ Response Data:", error?.response?.data);
      const message =
        error?.response?.data?.message || error?.message || "Failed to create booking";
      return rejectWithValue(message as string);
    }
  }
);


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
    resetBookingState: (state) => {
      state.bookingLoading = false;
      state.bookingError = null;
      state.bookingSuccess = false;
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

    // Create Booking
    builder
      .addCase(createBooking.pending, (state) => {
        state.bookingLoading = true;
        state.bookingError = null;
        state.bookingSuccess = false;
      })
      .addCase(createBooking.fulfilled, (state) => {
        state.bookingLoading = false;
        state.bookingSuccess = true;
        state.bookingError = null;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.bookingLoading = false;
        state.bookingError = action.payload as string;
        state.bookingSuccess = false;
      });
  },
});

export const { setCurrentDoctor, clearCurrentDoctor, resetBookingState } = doctorSlice.actions;
export default doctorSlice.reducer;
