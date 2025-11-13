import React, { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { FiSend, FiImage } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";

interface MessageInputProps {
    onSend: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
    const [newMessage, setNewMessage] = useState("");

    const handleSend = () => {
        if (!newMessage.trim()) return;
        onSend(newMessage);
        setNewMessage("");
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSend();
    };

    return (
        <div className="flex items-center bg-white border-t px-4 py-2">
            <button className="text-gray-500 mr-3 hover:text-yellow-500">
                <BsEmojiSmile size={20} />
            </button>
            <button className="text-gray-500 mr-3 hover:text-blue-500">
                <FiImage size={18} />
            </button>
            <input
                type="text"
                placeholder="اكتب رسالتك..."
                value={newMessage}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewMessage(e.target.value)
                }
                onKeyDown={handleKeyPress}
                className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                onClick={handleSend}
                className="ml-3 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition"
            >
                <FiSend size={16} />
            </button>
        </div>
    );
};

export default MessageInput;
