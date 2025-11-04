import { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";

interface Chat {
    id: number;
    name: string;
    avatar: string;
}

const ChatPage: React.FC = () => {
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

    return (
        <div className="flex h-screen max-w-[1300px] mx-auto">
            <ChatSidebar onSelectChat={(chat) => setSelectedChat(chat)} />
            <ChatWindow selectedUser={selectedChat} />
        </div>
    );
};

export default ChatPage;
