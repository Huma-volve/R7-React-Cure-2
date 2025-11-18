import React, { useState, useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";
import { sendMessage, startChat } from "../../api/Chat/chatService";

interface ChatWindowProps {
    selectedUser?: any;
    onToggleFavourite?: (chat: any) => void;
}

interface Message {
    id: number;
    sender: "me" | "other";
    content: string;
    time: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedUser, onToggleFavourite }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (selectedUser) {
            const initialMessage = selectedUser.lastMessageContent || "لا توجد رسائل بعد";
            const senderType = selectedUser.isLastMessageSentByPatient ? "me" : "other";

            setMessages([
                {
                    id: Date.now(),
                    sender: senderType,
                    content: initialMessage,
                    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                },
            ]);
        }
    }, [selectedUser]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (text: string) => {
        if (!selectedUser) return;

        let chatId = selectedUser.id;
        if (!chatId) {
            try {
                const chatData = await startChat(selectedUser.doctorId);
                chatId = chatData.id;
            } catch (error) {
                console.error("Error starting chat:", error);
                return;
            }
        }

        try {
            await sendMessage("c26b1ea0-1d14-4044-a3b1-2a9d057c0076", selectedUser.doctorId, chatId, text);

            const newMsg: Message = {
                id: Date.now(),
                sender: "me",
                content: text,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };

            setMessages((prev) => [...prev, newMsg]);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    if (!selectedUser) {
        return (
            <div className="flex flex-col items-center justify-center w-2/3 h-full bg-gray-50 text-center">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
                    alt="No chat"
                    className="w-24 h-24 mb-4 opacity-60"
                />
                <h3 className="text-gray-500 text-lg font-medium">اختر محادثة لبدء الدردشة</h3>
                <p className="text-gray-400 text-sm mt-1">لا توجد رسائل لعرضها حالياً</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-2/3 h-full bg-gray-50">
            {/* Header */}
            <div className="flex items-center gap-3 bg-white border-b px-4 py-3 shadow-sm justify-between">
                <div className="flex items-center gap-3">
                    <img src={selectedUser.img} alt={selectedUser.doctorName} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                        <h3 className="font-semibold text-sm">{selectedUser.doctorName}</h3>
                        <p className="text-xs text-green-500">متصل الآن</p>
                    </div>
                </div>
                {/* أيقونة القلب */}
                <div
                    className="cursor-pointer text-red-500 text-xl"
                    onClick={() => onToggleFavourite && onToggleFavourite(selectedUser)}
                >
                    {selectedUser.isFavourite ? "❤️" : "🤍"}
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                {messages.length > 0 ? (
                    messages.map((msg) => (
                        <MessageItem key={msg.id} sender={msg.sender} content={msg.content} time={msg.time} />
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
