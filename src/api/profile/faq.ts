import axios from "axios";
import Cookies from "js-cookie";


const Api_url = `https://cure-doctor-booking.runasp.net/`;

export const getFAQs = async () => {
    try {
        const response = await axios.get(`${Api_url}api/profile/faq`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("❌ Server error:", error);
    }
};