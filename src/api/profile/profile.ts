import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const Api_url = `https://cure-doctor-booking.runasp.net/`;

export const getProfile = createAsyncThunk(
    "user/getProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${Api_url}api/profile/Editprofile/getprofile`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("accessToken")}`,
                    },
                }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

interface updateProfileData {
    FullName: string;
    Email: string;
    PhoneNumber: string;
    Address: string;
    BirthDate: string;
    ImgFile?: string | null;
    Latitude?: number | null;
    Longitude?: number | null;
}

export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async (data: updateProfileData, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("FullName", data.FullName);
            formData.append("Email", data.Email);
            formData.append("PhoneNumber", data.PhoneNumber);
            formData.append("Address", data.Address);
            formData.append("BirthDate", data.BirthDate);
            if (data.ImgFile) formData.append("ImgFile", data.ImgFile as any);
            if (data.Latitude) formData.append("Latitude", data.Latitude.toString());
            if (data.Longitude) formData.append("Longitude", data.Longitude.toString());

            const response = await axios.put(
                `${Api_url}api/profile/editprofile/updateprofile`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            console.error("❌ Server error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
