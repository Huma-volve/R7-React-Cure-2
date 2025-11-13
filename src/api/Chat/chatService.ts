import axios from "axios";
import Cookies from "js-cookie";
// ضع هنا التوكن الصحيح
const TOKEN = ` ${Cookies.get("acssessToken")}`

// رابط السيرفر الأساسي
const BASE_URL = "https://cure-doctor-booking.runasp.net/";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${TOKEN}` },
});

// ------------------ GET CHATS ------------------
export const getChats = async () => {
    try {
        const response = await axiosInstance.get("api/chat/chat/chats");
        return response.data.data.chatListDTOs;
    } catch (error) {
        console.error("Error fetching chats:", error);
        return [];
    }
};

// ------------------ SEARCH DOCTORS ------------------
export const searchDoctors = async (query: string) => {
    try {
        const response = await axiosInstance.get(`api/chat/chat/chats?search=${encodeURIComponent(query)}`);
        return response.data.data;
    } catch (error) {
        console.error("Error searching doctors:", error);
        return { chatListDTOs: [], doctorsListDTO: [] };
    }
};

// ------------------ GET UNREAD CHATS ------------------
export const getUnreadChats = async () => {
    try {
        const response = await axiosInstance.get("api/chat/chat/chats?isUnRead=true");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching unread chats:", error);
        return { chatListDTOs: [], doctorsListDTO: [] };
    }
};

// ------------------ SEARCH & UNREAD ------------------
export const searchUnreadChats = async (query: string) => {
    try {
        const response = await axiosInstance.get(`api/chat/chat/chats?search=${encodeURIComponent(query)}&isUnRead=true`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching search & unread chats:", error);
        return { chatListDTOs: [], doctorsListDTO: [] };
    }
};

// ------------------ GET FAVOURITE CHATS ------------------
export const getFavouriteChats = async () => {
    try {
        const response = await axiosInstance.get("api/chat/chat/send");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching favourite chats:", error);
        return { chatListDTOs: [], doctorsListDTO: [] };
    }
};

// ------------------ START CHAT ------------------
export const startChat = async (receiverId: string) => {
    try {
        const response = await axiosInstance.post(`api/chat/chat/startChat?receiverId=${receiverId}`);
        return response.data.data;
    } catch (error) {
        console.error("Error starting chat:", error);
        return null;
    }
};



// ------------------ SEND MESSAGE ------------------
export const sendMessage = async (senderId: string, receiverId: string, chatId: number, message: string) => {
    try {
        const response = await axiosInstance.post("api/chat/chat/send", {
            senderId,
            receiverId,
            chatId,
            message,
        });
        return response.data.data;
    } catch (error) {
        console.error("Error sending message:", error);
        return null;
    }
};