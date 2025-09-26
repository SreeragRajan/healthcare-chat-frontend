import React, { useEffect, useState, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { getChatHistory, sendMessage } from "../services/api";
import LoadingSpinner from "./LoadingSpinner"; 

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch chat history on mount
  useEffect(() => {
    const fetchHistory = async () => {
      const history = await getChatHistory();
      setMessages(history);
    };
    fetchHistory();
  }, []);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending message
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

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative flex h-[85vh] w-full flex-col overflow-hidden bg-background-dark font-display text-gray-200">
      {/* Main Chat */}
      <main className="flex-1 overflow-y-auto p-6 pb-22">
        <div className="mx-auto max-w-4xl space-y-8">
          {messages.map((msg, idx) => (
            <MessageBubble
              key={idx}
              sender={msg.type === "user" ? "You" : "System"}
              text={msg.content}
              time={new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              avatar={
                msg.type === "user"
                  ? "https://lh3.googleusercontent.com/aida-public/AB6AXuCJWikMvYISw-1d9ZH_bO4QQF_QmdR8ZncgANruZyaTGSdJ3vpcQDpjF387fY8zDeE57Avw-mBN6XY96RoAO1VEFFguFB0ZQVeguZCQNQvuCQcaYRJGj9bv4tElmk_MyySI1UyKhJAvwR48wHKN427DSmz_0Hb4TrM8fVGSuqdTuTzmWbXwQhzbYWWobImScpWlsrAxiZsTAPA4u-OH1__d3l_ZVyrVm3TTRUJrU6qTstqGihk9PaRc8y_KSPPk64DwzZB49cZ3-oU"
                  : "https://lh3.googleusercontent.com/aida-public/AB6AXuAlRIavgGtatA_MI8UttRznVQhB_FT6iC9WK1tDou3aPy0lo6RXyNJ7_48TtZjJrtK2FxXZvT2EETu92EAuxFVyjtZ8JEfamt-0byftIf85066eqkyezVnIMEploZWD3B7tN77VWFRI8QslmQUezXSYDm9OZqOimOleKKi4C4jN37OnHSZxg7Bb13A9rfhMjD6guC0CorTNb_GP7D7cBMRXFEjn94lPw-gppyqNoEBVB0ktuA9zKaUJAfsbyzLU87wOFx-f0XeF4ts"
              }
              isYou={msg.type === "user"}
              failed={msg.failed}
            />
          ))}
          {loading && (
            <div className="flex justify-center py-2">
              <LoadingSpinner size={24} color="#60A5FA" /> 
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 bg-background-dark/90 backdrop-blur-sm border-t border-blue-700/30 p-4 w-full">
        <div className="mx-auto max-w-4xl">
          <div className="relative flex items-center gap-4">
            <div
              className="h-10 w-10 shrink-0 rounded-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBHRiFzipwaxXcPfb3JCyTwzlpV_RFeWghqubkcTQzaRSFMCagFox9X29kCGaMbjEvs8Nu4AAX8Ebu0F2PHOZP4sUCNLy0ZIXZyW96gow8PcSC0Pk8b6GXCCjjrOr8fEzDKtPupWuDHClIDLy4Xc1kdmvKzMoBbPL7MMKGCVkYNbiSzOmVoDnQVkSJV27Pxe45M33ByJmd4PWJrJ3NiDFh6n0_f3mYSPh4tYCYnQy3Vai7ggTlb2mShST8R4vT8ucwq0b8MAjooVMA')",
              }}
            />
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
          <div className="pl-16 pr-2 mt-2 flex justify-between items-center text-xs text-gray-400">
            <p>
              Press <kbd className="font-sans font-semibold">Enter</kbd> to
              send, <kbd className="font-sans font-semibold">Shift + Enter</kbd>{" "}
              for a new line.
            </p>
            <p>{input.length}/2000</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatInterface;
