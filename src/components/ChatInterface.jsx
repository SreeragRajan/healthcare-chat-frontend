import React, { useEffect, useState, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { getChatHistory, sendMessage } from "../services/api.js";
import LoadingSpinner from "./LoadingSpinner";
import { Search, FileText, X, SendHorizontal } from "lucide-react";

const ChatInterface = ({ onOpenPreview }) => {
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
    <div className="relative flex h-[90vh] w-full flex-col overflow-hidden bg-background-dark font-display text-gray-200">
      {/* Search bar + Preview Button */}
      <div className="flex items-center px-1 pt-2 md:gap-2 md:px-3 sm:px-4 py-2 border-b border-gray-700/30 bg-background-dark">
        <Search size={25} className="hidden md:flex text-gray-600" />
        <input
          type="text"
          placeholder="Search messages..."
          className="outline-none flex-1 rounded-md px-2 py-1 sm:px-3 sm:py-2 bg-gray-800 text-gray-200 text-sm sm:text-base focus:ring focus:ring-blue-500/50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Mobile Preview Button */}
        <button
          onClick={onOpenPreview}
          className="ml-1 sm:ml-2 flex items-center gap-1 px-2 py-1 rounded-md bg-blue-500 text-white text-sm md:hidden"
        >
          <FileText size={16} className="hidden sm:block" />
          Preview
        </button>
      </div>

      {/* Chat Section */}
      <main className="custom-scrollbar flex-1 overflow-y-auto p-1 sm:p-6 mb-22">
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
            avatar={
              msg.type === "user"
                ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKoAAACUCAMAAAA02EJtAAAAZlBMVEXZ3OFwd3/d4OVyd3tweHtxd31ydn/Z3eBweH3h5Olqb3OnrLBrdHbMz9TT1tttcnaUmZ3Aw8h+holkbHWKjpK0ub2do6ZqcXplb3GusrZlam5+hYx7gYWNlJeEjI50fX+ipq6QlJ1e4bZfAAAE6klEQVR4nO2cW3erKhCAkwGMIogkXhOT7P7/P3nQtD3Zu7mAoGPX8ntrnr6FMAzD0M1mZWVlZWVlZWVlZWVlZWVlWUDyCWCbvAQANjr9uOz3xUeqhz+XCexkezoc6nprqOvD4dTKzRJlIdF5xwfNLxjvcr28kYWsihUh279UCVG0ypblCtBu/xrQ/6njdkkDa4aUPxY1EL6ggYWsEPS5KlHFUlwhI+qp6IAiy3AFuVfspSkjai+X4JoVir1W3TJm5sAOW3QDxfMVdQcv0Ic1SZvYRpXwFNkVtI3nANW4rlnxJPL/RF0yTFNo34SpO2LVog7rP7v+Kxi9IoomKXdRbdIEyxSy7l1EvYfSDm22QmnvOSBKtNmaWy//T9UcSRTk1XFUKUFKBaBsHFUJR5oBkAtXVZUjqXauqox1OKqZQ1D94oBiCvI4QhVlXUE5ZlRLQEixoR2j2mKoOiUA36rpL1GNojpNVtUJVH/RssJIWccGKwxV7b4FsCPKsXXEbkVpg5MF7saoYoiaYSXPK5WPiaItUhJYuCaBUY1UuYLUXfUPkqp2PbDQBqtu5X4M7LAqwtnZ9XB9xhHtJ6vrqKLVWEE6ql7xbgQgf3NhcQ9jWEfrQdUlDWAEJwH4JDnbl4KZOqPVLA07SWKrW4teFXGm9kAlqKWrqrCvg87CTrUukEU3kF2tpquI8a9ZQTOLPavGvrW6ucpT/S661qdFXAcb14K/uBQihPDLMkxvTRbPJyxRS2qz6PssYjNjH8UCRooMM/T/AEBXeyEE/cZoU/PDvlpe+xKALKuuMYiB5nCou6qUixMdAICdLNMqN6RpKRfcadcDn+2LsGzNlZXfxm4A28KK36EK363WfbzCtnnMLYxK3aYfH4XhI09LLXcb2CzL2NgYyXzfHJuG11G0jaKIcc4bsc9bLZdja3b/Nj8xbg6EJk25S6li84Nq4lPeSlhAcgWQtRfK+qF8ghlhQoo2Qx5a2OhKNIKy6I0qaUSlETvvTZJ6jnkcv222YozFMadnrNTViBbUsggw+FJBChRZkLn58rallUGVUtHksx8IAdJOmS/v0GfXTwMWqy7dzSrbt4K7X7D2ECLmbBGHTar+fQRir8qESueKBZDlL8KoDSqfpzAA8qL8TLexmKXcAtos/BcR30qVCjV9uQ1K5XhZ9RhGpm5iSMqRy+mnKiknTWGS9ugUSl+5suOUHe3m64fxvMmq6eYAaOrarPAKk29NtbZAB/r2XzAmpnGFrAv5+Xti0U2yF0DukPFZqtJJrl2h4iTwBOjhVfCCgVlSZArV8NMVoKNu2aklZroGPhiYzz+B50Ad9u4V9CRf/wYLOwXOb19VjkeFbL5xfwLiQtwE3GCBhkmnHkMFDaYK7dv7Xi9YHSofhOzkeUB5QxTtA+2v0HqeT96rhnqM6dxP506gIODeUOkO40Fia2LbSOOjqvIQCwtG9NS7cwgwqn37/6Sh6lM1wDYA5+m21Hv8u7BBnuYQ3W7964POL4DHcvWeAbtq8qB6Q/inrefJI9UN5d0z6NylPhbSST9T0K7PFEar+pYxobX7ByABVLlnypKEr1M8U/XdW2E/x646UJ88VQNVfq1cPaPViHfVY/F7Og7yMJvp9iB9ylegZ1T1e+EAms8UAAx+J4GkbEKW1F9TeyUs86p67QFJuyDV/wC0LkwVqVVTHQAAAABJRU5ErkJggg=="
                : "https://lh3.googleusercontent.com/aida-public/AB6AXuAlRIavgGtatA_MI8UttRznVQhB_FT6iC9WK1tDou3aPy0lo6RXyNJ7_48TtZjJrtK2FxXZvT2EETu92EAuxFVyjtZ8JEfamt-0byftIf85066eqkyezVnIMEploZWD3B7tN77VWFRI8QslmQUezXSYDm9OZqOimOleKKi4C4jN37OnHSZxg7Bb13A9rfhMjD6guC0CorTNb_GP7D7cBMRXFEjn94lPw-gppyqNoEBVB0ktuA9zKaUJAfsbyzLU87wOFx-f0XeF4ts"
            }
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
      <footer className="absolute bottom-[-1%] bg-black/30 backdrop-blur-sm border-t border-blue-700/30 p-3 sm:p-4 w-full">
        <div className="mx-auto max-w-4xl">
          <div className="w-[98%] sm:gap-4">
            <div className="w-full flex items-center gap-2">
              <textarea
                className="custom-scrollbar w-full resize-none rounded-lg border-blue-700/50 bg-gray-800 text-gray-200 px-3 py-2 sm:px-4 sm:py-3 pr-20 sm:pr-24 text-sm sm:text-base focus:border-blue-500 focus:ring-blue-500/50 transition-all placeholder:text-xs sm:placeholder:text-sm outline-none"
                placeholder="Type your message..."
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="">
                <span onClick={handleSend} className="cursor-pointer text-blue-500 hover:text-blue-400">
                <SendHorizontal size={28} className="sm:hidden" />
                </span>
                <button
                  onClick={handleSend}
                  disabled={loading}
                  className="hidden sm:flex cursor-pointer px-2 py-1 sm:px-3 sm:py-2 items-center justify-center rounded bg-blue-700 text-white hover:bg-blue-600 disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Instruction Text */}
          <div className="hidden md:block mt-2 text-xs text-gray-100">
            Press <kbd className="px-1 py-0.5 bg-gray-700 rounded">Enter</kbd>{" "}
            to send,{" "}
            <kbd className="px-1 py-0.5 bg-gray-700 rounded">Shift + Enter</kbd>{" "}
            for a new line.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatInterface;
