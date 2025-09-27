import React, { useEffect, useState, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { getChatHistory, sendMessage, parseDocument } from "../services/api.js"; 
import LoadingSpinner from "./LoadingSpinner";
import { Search, Upload } from "lucide-react";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);

  // Fetch chat history
  useEffect(() => {
    const fetchHistory = async () => {
      const history = await getChatHistory();
      setMessages(history);
    };
    fetchHistory();
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await sendMessage(input);
      setMessages((prev) => [...prev, response]);
    } catch (err) {
      console.error("Message failed:", err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === userMessage.id ? { ...msg, failed: true } : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  // Enter key handler
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };


  // Filtered messages
  const filteredMessages = messages.filter((msg) =>
    msg.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative flex h-[88vh] w-full flex-col overflow-hidden bg-background-dark font-display text-gray-200">
      {/* Search */} 
      <div className=" pb-2 pt-2 mr-4 border-b border-gray-700/30 bg-background-dark flex items-center gap-3">
        <Search size={20} color="gray" />
        <input
          type="text"
          placeholder="Search messages..."
          className="outline-none flex-1 rounded-md px-3 py-2 bg-gray-800 text-gray-200 text-sm focus:ring focus:ring-blue-500/50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
       
      </div>

      {/* Chat Section */}
      <main className="flex-1 overflow-y-auto p-6 pb-28">
        {filteredMessages.map((msg, idx) => (
          <MessageBubble
            key={idx}
            sender={msg.type === "user" ? "You" : "System"}
            text={msg.content}
            time={new Date(msg.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            isYou={msg.type === "user"}
            failed={msg.failed}
          />
        ))}
        {loading && (
          <div className="flex justify-center py-2">
            <LoadingSpinner size={24} color="#60A5FA" />
          </div>
        )}
        {filteredMessages.length === 0 && !loading && (
          <p className="text-center text-gray-500 text-sm">No messages found</p>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Footer Input */}
      <footer className="absolute bottom-[-1%] bg-background-dark/90 backdrop-blur-sm border-t border-blue-700/30 p-4 w-full">
        <div className="mx-auto max-w-4xl">
          <div className="relative flex items-center gap-4">
            <div className="relative flex-1">
              <textarea
                className="form-textarea flex items-center w-full resize-none rounded-lg border-blue-700/50 bg-gray-800 text-gray-200 px-4 py-3 pr-24 focus:border-blue-500 focus:ring-blue-500/50 transition-all"
                placeholder="Type your message..."
                rows="1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="absolute bottom-2 right-2 flex items-center gap-2">
                <button
                  onClick={handleSend}
                  disabled={loading}
                  className="cursor-pointer flex px-2 py-1 items-center justify-center rounded-lg bg-blue-700 text-white hover:bg-blue-600 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center text-xs text-gray-400">
            <p>
              Press <kbd>Enter</kbd> to send, <kbd>Shift + Enter</kbd> for a new line.
            </p>
            <p>{input.length}/2000</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatInterface;
