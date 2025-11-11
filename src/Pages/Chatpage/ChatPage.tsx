import React, { useState, useEffect } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import { getChats } from "../../api/Chat/chatService";

const ChatPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [chats, setChats] = useState<any[]>([]);

  // جلب المحادثات من السيرفر عند البداية
  const fetchChats = async () => {
    const data = await getChats();
    setChats(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  // تحديث favourite
  const handleToggleFavourite = (chat: any) => {
    chat.isFavourite = !chat.isFavourite;
    setChats((prev) =>
      prev.map((c) => (c.id === chat.id ? { ...c, isFavourite: chat.isFavourite } : c))
    );
  };

  // تحديث آخر رسالة بعد الإرسال
  const handleUpdateLastMessage = (chatId: number, message: string) => {
    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId ? { ...c, lastMessageContent: message, unReadMessages: 0 } : c
      )
    );
  };

  return (
    <div className="flex h-screen max-w-[1300px] mx-auto">
      <ChatSidebar
        onSelectChat={(chat) => setSelectedChat(chat)}
        chats={chats}
      />
      <ChatWindow
        selectedUser={selectedChat}
        onToggleFavourite={handleToggleFavourite}
        onSendMessage={handleUpdateLastMessage}
      />
    </div>
  );
};

export default ChatPage;
