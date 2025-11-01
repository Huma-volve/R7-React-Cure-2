import React from "react";

interface MessageItemProps {
    sender: "me" | "other";
    content: string;
    time: string;
}

const MessageItem: React.FC<MessageItemProps> = ({ sender, content, time }) => {
    return (
        <div className={`flex ${sender === "me" ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm ${sender === "me"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 border rounded-bl-none"
                    }`}
            >
                <p>{content}</p>
                <span className="text-[10px] block text-right text-gray-400 mt-1">
                    {time}
                </span>
            </div>
        </div>
    );
};

export default MessageItem;
