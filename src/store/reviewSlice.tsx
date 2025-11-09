import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Types
interface Review {
  fullName: string;
  time: string;
  rating: number;
  text: string;
}

interface AddReviewData {
  doctorId: number;
  rating: number;
  comment: string;
  createAt: string; 
}

interface ReviewState {
  reviews: Review[];
  addReviewLoading: boolean;
  addReviewError: string | null;
  addReviewSuccess: boolean;
}

// Initial State
const initialState: ReviewState = {
  reviews: [],
  addReviewLoading: false,
  addReviewError: null,
  addReviewSuccess: false,
};

const API_BASE_URL = "https://cure-doctor-booking.runasp.net/api";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMDdmYmFlOC1lMTg5LTQwZjQtOWFmNS1iNmYwN2NmMzUxZjEiLCJ1bmlxdWVfbmFtZSI6IisyMDEyMzQ1Njc4OTEiLCJmaXJzdE5hbWUiOiJPbWFyIiwibGFzdE5hbWUiOiJFbGtoYWRyYXd5IiwiYWRkcmVzcyI6IiIsImltZ1VybCI6IiIsImJpcnRoRGF0ZSI6IjAwMDEtMDEtMDEiLCJnZW5kZXIiOiJNYWxlIiwibG9jYXRpb24iOiIiLCJpc05vdGlmaWNhdGlvbnNFbmFibGVkIjoiVHJ1ZSIsImV4cCI6MTc2MjM5MzA1MiwiaXNzIjoiaHR0cHM6Ly9jdXJlLWRvY3Rvci1ib29raW5nLnJ1bmFzcC5uZXQvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMCxodHRwczovL2xvY2FsaG9zdDo1NTAwLGh0dHBzOi8vbG9jYWxob3N0OjQyMDAgLGh0dHBzOi8vY3VyZS1kb2N0b3ItYm9va2luZy5ydW5hc3AubmV0LyJ9.sOAGVPVOcbK4FdsW4HkyxSaNTZaeY5C0mVTg4huz0YM";

// Async Thunk للـ Add Review
export const addReview = createAsyncThunk(
  'review/addReview',
  async (reviewData: AddReviewData, { rejectWithValue }) => {
    try {
      const token = Cookies.get("accessToken") || TOKEN;
      
      console.log("📤 Sending review data:", reviewData);

      const res = await axios.post(
        `${API_BASE_URL}/Customer/Reviews/AddReview`,
        JSON.stringify(reviewData),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("✅ Review Added:", res.data);
      return res.data;
    } catch (error: any) {
      console.error("❌ Full Error:", error);
      console.error("❌ Response Data:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to add review"
      );
    }
  }
);

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    resetReviewState: (state) => {
      state.addReviewLoading = false;
      state.addReviewError = null;
      state.addReviewSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.addReviewLoading = true;
        state.addReviewError = null;
        state.addReviewSuccess = false;
      })
      .addCase(addReview.fulfilled, (state) => {
        state.addReviewLoading = false;
        state.addReviewSuccess = true;
        state.addReviewError = null;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.addReviewLoading = false;
        state.addReviewError = action.payload as string;
        state.addReviewSuccess = false;
      });
  },
});

export const { resetReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;