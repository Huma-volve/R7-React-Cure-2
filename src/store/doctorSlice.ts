import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Types
interface AvailableSlot {
  id: number;
  doctorId: number;
  dateTime: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}
interface Review {
  id?: number;
  rating: number;
  comment: string;
  patientName?: string;
  createdAt?: string;
}


interface Doctor {
  experienceYears: number | undefined;
  bookingCount: number | undefined;
  reviewsCount: number | undefined;
  reviews: Review[];
  id: number;
  fullName: string;
  about: string;
  imgUrl: string;
  specialityId?: number;
  specialistTitle?: string;
  address: string;
  rating: number;
  distance?: number | null;
  isFavourite?: boolean;
  price?: number;
  pricePerHour?: number;
  startDate?: string | null;
  endDate?: string | null;
  specialities: string | string[];
  availableSlots?: AvailableSlot[];
};

interface BookingData {
  DoctorId: number;
  SlotId: number;
  Amount: number;
  Payment: number;
  Status: number;
  AppointmentAt: string;
}

interface DoctorState {
  allDoctors: any;
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
  allDoctors: undefined
};

const API_BASE_URL = "https://cure-doctor-booking.runasp.net/api";

// Async Thunks
export const fetchDoctors = createAsyncThunk(
  'doctor/fetchDoctors',
  async (_, { rejectWithValue }) => {
    try {
            const token = Cookies.get("accessToken"); 

      const res = await axios.get(
        `${API_BASE_URL}/Customer/Doctors/GetAllDoctors`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      console.log("Fetched Doctors:", res.data.data);
      return res.data.data;
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
      
      const token = Cookies.get("accessToken");

      const res = await axios.get(
        `${API_BASE_URL}/Customer/Doctors/DoctorDetails/${doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      console.log("Fetched Doctor:", res.data.data);
      console.log("Available Slots:", res.data.data.availableSlots);
      return res.data.data;
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
      const token = Cookies.get("accessToken");

      const res = await axios.post(

        `${API_BASE_URL}/Customer/Booking/CreateBooking`,
        JSON.stringify(bookingData), // <── تأكد إنها JSON String
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
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
        const doctorData = action.payload || {};
        state.currentDoctor = {
          ...doctorData,
          about: doctorData.about || "",
          fullName: doctorData.fullName || doctorData.name || "Unknown Doctor",
          imgUrl: doctorData.imgUrl || doctorData.image || "",
          address: doctorData.address || "Unknown Location",
          specialities: doctorData.specialities || doctorData.speciality || "General",
          reviews: doctorData.reviews || [],
        } as Doctor;
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


