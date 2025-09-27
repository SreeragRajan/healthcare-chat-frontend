import React, { useState } from "react";
import ChatInterface from "./ChatInterface";
import DocumentPreview from "./DocumentPreview";
import { X } from "lucide-react";

const ChatWithDocuments = () => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-[90vh] w-full gap-4 relative">
      {/* Left Side Chat */}
      <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-gray-700/40">
        <ChatInterface onOpenPreview={() => setShowPreview(true)} />
      </div>

      {/* Right Side Document Preview - desktop */}
      <div className="w-full pt-2 hidden md:flex md:flex-col md:w-1/3 ">
        <DocumentPreview />
      </div>

      {/* Mobile Preview Drawer */}
      {showPreview && (
        <div className="absolute inset-0 z-50 bg-black/50 flex justify-end md:hidden">
          <div className="w-4/5 max-w-xs bg-gray-900 text-gray-400 h-full shadow-xl flex flex-col relative">
            {/* Close Button */}
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 p-2 m-1 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
            >
              <X size={20} />
            </button>

            <div className="p-4 flex-1 overflow-auto">
              <DocumentPreview />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWithDocuments;
