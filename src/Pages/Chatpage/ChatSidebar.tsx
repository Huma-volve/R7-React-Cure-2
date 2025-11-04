import { useState, ChangeEvent } from "react";
import { FiSearch } from "react-icons/fi";
import chatData from "./dummyData.json"; // استيراد الداتا من ملف JSON

interface Chat {
    id: number;
    name: string;
    lastMessage: string;
    unread: number;
    time: string;
    avatar: string;
    isFavourite?: boolean;
    messages?: Message[];
}

interface Message {
    id: number;
    sender: "me" | "other";
    content: string;
    time: string;
}

type TabType = "All" | "Favourite" | "Unreaded";

interface ChatSidebarProps {
    onSelectChat: (chat: Chat) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ onSelectChat }) => {
    const [selectedTab, setSelectedTab] = useState<TabType>("All");
    const [searchValue, setSearchValue] = useState<string>("");

    const tabs: TabType[] = ["All", "Favourite", "Unreaded"];

    
    const conversations: Chat[] = chatData.chats;

    const filteredChats = conversations.filter((chat) => {
        const matchesSearch = chat.name.toLowerCase().includes(searchValue.toLowerCase());
        const matchesTab =
            selectedTab === "All" ||
            (selectedTab === "Favourite" && chat.isFavourite) ||
            (selectedTab === "Unreaded" && chat.unread > 0);
        return matchesSearch && matchesTab;
    });

    return (
        <div className="w-1/3 min-w-[280px] h-full bg-white border-r flex flex-col p-4">
            {/* 🔍 Search Bar */}
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

            {/* 🗂️ Tabs */}
            <div className="flex gap-3 mb-4 justify-around">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${selectedTab === tab
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* 💬 Chat List */}
            <div className="flex-1 overflow-y-auto">
                {filteredChats.length > 0 ? (
                    filteredChats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => onSelectChat(chat)}
                            className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={chat.avatar}
                                    alt={chat.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-semibold text-sm">{chat.name}</h4>
                                    <p className="text-xs text-gray-500 truncate w-[130px]">
                                        {chat.lastMessage}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                                <span className="text-[11px] text-gray-400">{chat.time}</span>
                                {chat.unread > 0 && (
                                    <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                                        {chat.unread}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm text-center mt-10">
                        No conversations found
                    </p>
                )}
            </div>
        </div>
    );
};

export default ChatSidebar;
