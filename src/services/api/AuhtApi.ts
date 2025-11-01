import axios from "axios";
const base_url = "http://localhost:3001";

export const signupThunk = (data: any) => axios.post(`${base_url}/auth/local/register`, {
    fullname: data.fullname,
    email: data.email,
    phoneNumber: data.phoneNumber
}
);
export const googleLoginThunk = (data: any) => axios.post(`${base_url}/google`, {
    token: data
});
export const loginThunk = (data: any) => axios.post(`${base_url}/auth/local`, {
    phoneNumber: data.phoneNumber
});
export const verifyOTPThunk = (data: any) => axios.post(`${base_url}/verify-otp`, {
    phoneNumber: data.phoneNumber,
    otp: data.otp
});