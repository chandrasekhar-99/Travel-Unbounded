
"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiMessageCircle,
  FiSend,
  FiX,
  FiRefreshCw,
} from "react-icons/fi";

import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

import useTravelChat from "@/hooks/useTravelChat";
import ItineraryCard from "./ItineraryCard";

const TravelChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const {
    messages,
    input,
    isLoading,
    handleInputChange,
    sendMessage,
    resetChat,
  } = useTravelChat();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await sendMessage();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-8 right-4 z-50 flex h-[600px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl  bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-primary px-4 py-4 text-white">
            <div>
              <h2 className="font-semibold">Travel Assistant</h2>

              <p className="text-xs text-white/80">
                Plan your next adventure
              </p>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetChat}
                disabled={isLoading}
                className="rounded-full p-2 transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Start over"
                title="Start over"
              >
                <FiRefreshCw size={18} />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 transition hover:bg-primary-dark"
                aria-label="Close chat"
                title="Close chat"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
            {messages.map((message, index) => {
              if (message.type === "itinerary") {
                return (
                  <ItineraryCard
                    key={`itinerary-${index}`}
                    itinerary={message.itinerary}
                  />
                );
              }

              return (
                <ChatMessage
                  key={`${message.role}-${index}`}
                  message={message}
                />
              );
            })}

            {isLoading && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-200 bg-white p-3"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder={
                  isLoading
                    ? "Travel assistant is typing..."
                    : "Type a message..."
                }
                className="min-w-0 flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-gray-100"
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                <FiSend size={18} />
              </button>
            </div>
          </form>
        </div>
      )}

      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:scale-105 hover:bg-primary-dark"
          aria-label="Open travel assistant"
        >
          <FiMessageCircle size={26} />
        </button>
      )}
    </>
  );
};

export default TravelChatbot;