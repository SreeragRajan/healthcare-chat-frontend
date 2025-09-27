// ChatWithDocuments.jsx
import React from "react";
import ChatInterface from "./ChatInterface";
import DocumentPreview from "./DocumentPreview";

const ChatWithDocuments = () => {
  return (
    <div className="flex h-[88vh] w-full gap-4 p-4">
      {/* Left Side Chat */}
      <div className="flex-1 flex flex-col border-r border-gray-700/40">
        <ChatInterface />
      </div>

      {/* Right Side Document Preview */}
      <div className="w-1/3 flex flex-col">
        <DocumentPreview />
      </div>
    </div>
  );
};

export default ChatWithDocuments;
