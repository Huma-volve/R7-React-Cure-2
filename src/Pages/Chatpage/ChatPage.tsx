import React, { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";

const ChatPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<any>(null);

  return (
    <div className="flex h-screen max-w-[1300px] mx-auto">
      <ChatSidebar onSelectChat={(chat) => setSelectedChat(chat)} />
          <ChatWindow selectedUser={selectedChat} />
    </div>
  );
};

export default ChatPage;
