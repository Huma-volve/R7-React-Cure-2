import { getChats, getUnreadChats, searchDoctors, searchUnreadChats } from "@/api/Chat/chatService";
import React, { useState, useEffect, type ChangeEvent } from "react";
import { FiSearch } from "react-icons/fi";

interface Chat {
    id: number;
    doctorId: string;
    doctorName: string;
    img: string;
    lastMessageContent: string;
    unReadMessages: number;
}

interface ChatSidebarProps {
    onSelectChat: (chat: Chat) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ onSelectChat }) => {
    const [searchValue, setSearchValue] = useState("");
    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedTab, setSelectedTab] = useState<"All" | "Unread">("All");

    const tabs = ["All", "Unread"];

    const fetchChats = async () => {
        try {
            let data;
            if (selectedTab === "All" && searchValue === "") {
                data = await getChats();
            } else if (selectedTab === "All") {
                data = (await searchDoctors(searchValue)).chatListDTOs;
            } else if (selectedTab === "Unread" && searchValue === "") {
                data = (await getUnreadChats()).chatListDTOs;
            } else {
                data = (await searchUnreadChats(searchValue)).chatListDTOs;
            }
            setChats(data);
        } catch (error) {
            console.error("Error fetching chats:", error);
            setChats([]);
        }
    };

    useEffect(() => {
        fetchChats();
    }, [selectedTab, searchValue]);

    return (
        <div className="w-1/3 min-w-[280px] h-full bg-white border-r flex flex-col p-4">
            {/* Search */}
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mb-4">
                <FiSearch className="text-gray-500 mr-2" />
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                    className="bg-transparent outline-none w-full text-sm"
                />
            </div>

            {/* Tabs */}
            <div className="flex gap-3 mb-4 justify-around">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setSelectedTab(tab as any)}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${selectedTab === tab ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
                {chats.length > 0 ? (
                    chats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => onSelectChat(chat)}
                            className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition"
                        >
                            <div className="flex items-center gap-3">
                                <img src={chat.img} alt={chat.doctorName} className="w-10 h-10 rounded-full object-cover" />
                                <div>
                                    <h4 className="font-semibold text-sm">{chat.doctorName}</h4>
                                    <p className="text-xs text-gray-500 truncate w-[130px]">{chat.lastMessageContent}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                {chat.unReadMessages > 0 && (
                                    <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                                        {chat.unReadMessages}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm text-center mt-10">No conversations found</p>
                )}
            </div>
        </div>
    );
};

export default ChatSidebar;
