import axios from "axios";

// ضع هنا التوكن الصحيح
const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0ZTk2MWQwMC1kYTQ4LTRkMTAtODI5Yy1kZmRlOTY5MTk3NjMiLCJ1bmlxdWVfbmFtZSI6IisyMDEwOTMxMzA0ODg3IiwiZmlyc3ROYW1lIjoiQWhtZWQiLCJsYXN0TmFtZSI6Ik91ZiIsImFkZHJlc3MiOiIiLCJpbWdVcmwiOiIiLCJiaXJ0aERhdGUiOiIwMDAxLTAxLTAxIiwiZ2VuZGVyIjoiTWFsZSIsImxvY2F0aW9uIjoiIiwiaXNOb3RpZmljYXRpb25zRW5hYmxlZCI6IlRydWUiLCJleHAiOjE3NjI3NjQ2MzQsImlzcyI6Imh0dHBzOi8vY3VyZS1kb2N0b3ItYm9va2luZy5ydW5hc3AubmV0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDAsaHR0cHM6Ly9sb2NhbGhvc3Q6NTUwMCxodHRwczovL2xvY2FsaG9zdDo0MjAwICxodHRwczovL2N1cmUtZG9jdG9yLWJvb2tpbmcucnVuYXNwLm5ldC8ifQ.ZXuXdjWg8szRqim5WpNYUoP3edj3WoYJaU7ct7EtZYk";

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