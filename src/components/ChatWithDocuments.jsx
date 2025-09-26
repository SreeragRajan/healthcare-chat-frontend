// ChatWithDocuments.jsx
import React from "react";
import ChatInterface from "./ChatInterface";
import DocumentPreview from "./DocumentPreview";

const ChatWithDocuments = () => {
  return (
    <div className="w-full flex p-6">
      {/* Left Side Chat */}
      <ChatInterface className="md:col-span-2" />

      {/* Right Side Document Preview */}
      <DocumentPreview />
    </div>
  );
};

export default ChatWithDocuments;
