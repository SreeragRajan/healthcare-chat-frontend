import React from "react";

const MessageBubble = ({ sender, text, time, avatar, isYou, failed, onRetry }) => {
  return (
    <div
      className={`flex items-start gap-2 sm:gap-4 ${
        isYou ? "justify-end" : "justify-start"
      }`}
    >
      {/* Avatar (left for system, right for you) */}
      {!isYou && (
        <div
          className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 rounded-full bg-cover bg-center"
          style={{ backgroundImage: `url(${avatar})` }}
        />
      )}

      {/* Message Content */}
      <div
        className={`flex flex-col gap-1 max-w-[75%] sm:max-w-md lg:max-w-lg ${
          isYou ? "items-end" : "items-start"
        }`}
      >
        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          <p className="text-xs sm:text-sm font-semibold text-gray-500">{sender}</p>
          <p className="text-[10px] sm:text-xs text-gray-400">{time}</p>
        </div>
        <p
          className={`rounded-lg p-2 sm:p-3 shadow-sm whitespace-pre-wrap break-words text-sm sm:text-base ${
            isYou
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-200 border border-blue-700/30"
          }`}
        >
          {text}
        </p>

        {/* Failed message handling */}
        {failed && (
          <button
            onClick={onRetry}
            className="text-[10px] sm:text-xs text-red-500 mt-1 flex items-center gap-1 hover:underline"
          >
            <span className="material-symbols-outlined text-xs">error</span>
            <span>Failed to send. Retry</span>
          </button>
        )}
      </div>

      {/* Avatar for "You" */}
      {isYou && (
        <div
          className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 rounded-full bg-cover bg-center"
          style={{ backgroundImage: `url(${avatar})` }}
        />
      )}
    </div>
  );
};

export default MessageBubble;
