import React, { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";

const ChatPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [favouriteChats, setFavouriteChats] = useState<any[]>([]);

  // دالة لتبديل Favourite
  const handleToggleFavourite = (chat: any) => {
    chat.isFavourite = !chat.isFavourite;

    if (chat.isFavourite) {
      setFavouriteChats((prev) => {
        if (!prev.find((c) => c.id === chat.id)) return [...prev, chat];
        return prev;
      });
    } else {
      setFavouriteChats((prev) => prev.filter((c) => c.id !== chat.id));
    }
  };

  return (
    <div className="flex h-screen max-w-[1300px] mx-auto">
      <ChatSidebar
        onSelectChat={(chat) => setSelectedChat(chat)}
        favouriteChats={favouriteChats}
      />
      <ChatWindow
        selectedUser={selectedChat}
        onToggleFavourite={handleToggleFavourite}
      />
    </div>
  );
};

export default ChatPage;
