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

export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${Api_url}api/profile/editprofile/updateprofile`,
                data,
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