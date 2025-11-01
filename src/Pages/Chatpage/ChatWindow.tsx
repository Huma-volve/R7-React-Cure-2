import React, { useState, useRef, useEffect } from "react";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";

interface Message {
    id: number;
    sender: "me" | "other";
    content: string;
    time: string;
}

interface User {
    id: number;
    name: string;
    avatar: string;
    messages?: Message[];
}

interface ChatWindowProps {
    selectedUser?: User;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedUser }) => {
    const user =
        selectedUser || {
            id: 1,
            name: "د. أحمد سامي",
            avatar: "https://i.pravatar.cc/100?img=3",
            messages: [],
        };

    const [messages, setMessages] = useState<Message[]>(user.messages || []);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setMessages(user.messages || []);
    }, [user]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = (text: string) => {
        const message: Message = {
            id: Date.now(),
            sender: "me",
            content: text,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };
        setMessages((prev) => [...prev, message]);
    };

    return (
        <div className="flex flex-col w-2/3 h-full bg-gray-50">
            {/* Header */}
            <div className="flex items-center gap-3 bg-white border-b px-4 py-3 shadow-sm">
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <h3 className="font-semibold text-sm">{user.name}</h3>
                    <p className="text-xs text-green-500">متصل الآن</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                {messages.length > 0 ? (
                    messages.map((msg) => (
                        <MessageItem
                            key={msg.id}
                            sender={msg.sender}
                            content={msg.content}
                            time={msg.time}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-400 text-sm mt-5">لا توجد رسائل بعد</p>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <MessageInput onSend={handleSendMessage} />
        </div>
    );
};

export default ChatWindow;
