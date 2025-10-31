import axios from "axios";
const base_url = "http://localhost:3001/users";

export const signupThunk = (data: any) => axios.post(`${base_url}/signup`, data);
export const googleLoginThunk = (data: any) => axios.post(`${base_url}/google`, data);
export const loginThunk = (data: any) => axios.post(`${base_url}/login`, data);
export const verifyOTPThunk = (data: any) => axios.post(`${base_url}/verify-otp`, data);