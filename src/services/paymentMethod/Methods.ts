import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const base_url = `https://cure-doctor-booking.runasp.net/`;


export const getMethods = createAsyncThunk(
    "user/getMethods",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${base_url}api/profile/paymentmethods/getall?methodName=${Cookies.get("methodName")}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
)

interface PaymentMethod {
    methodName: string,
    providerToken: string,
    last3: string,
    brand: string,
    expMonth: number,
    expYear: number
}
export const addMethods = createAsyncThunk(
    "user/addMethods",
    async (data: PaymentMethod, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${base_url}api / profile / paymentmethods / add`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
)