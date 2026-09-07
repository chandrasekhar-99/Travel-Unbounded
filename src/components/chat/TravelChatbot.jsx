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
import ItineraryCard from "./ItineraryCard";
import useTravelChat from "@/hooks/useTravelChat";

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

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  // Submit message
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!input.trim() || isLoading) return;

    await sendMessage();
  };

  return (
    <>
      {/* ==================================================
          CHAT WINDOW
      ================================================== */}
      {isOpen && (
        <div
          className="
            fixed
            z-50

            /* ================= MOBILE ================= */
            bottom-3
            left-3
            right-3
            h-[70dvh]
            max-h-140

            /* ================= TABLET ================= */
            sm:left-auto
            sm:right-4
            sm:bottom-4
            sm:w-85
            sm:h-125

            /* ================= DESKTOP ================= */
            lg:right-5
            lg:bottom-5
            lg:w-90
            lg:h-135

            /* ================= LARGE DESKTOP ================= */
            xl:right-6
            xl:bottom-6
            xl:w-95
            xl:h-142.5

            flex
            flex-col
            overflow-hidden

            rounded-2xl
            

            bg-white
            shadow-xl
          "
        >
          {/* ==================================================
              HEADER
          ================================================== */}
          <div
            className="
              flex
              shrink-0
              items-center
              justify-between

              bg-primary
              px-3
              py-2.5
              text-white

              sm:px-3.5
              sm:py-3
            "
          >
            {/* Title */}
            <div className="min-w-0">
              <h2
                className="
                  truncate
                  text-sm
                  font-semibold
                "
              >
                Travel Assistant
              </h2>

              <p
                className="
                  mt-0.5
                  truncate
                  text-[10px]
                  text-white/80
                "
              >
                Plan your next adventure
              </p>
            </div>

            {/* Header Buttons */}
            <div className="flex shrink-0 items-center gap-0.5">
              {/* Reset */}
              <button
                type="button"
                onClick={resetChat}
                disabled={isLoading}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center

                  rounded-full
                  transition

                  hover:bg-primary-dark

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white/70

                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
                aria-label="Start over"
                title="Start over"
              >
                <FiRefreshCw className="h-4 w-4" />
              </button>

              {/* Close */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center

                  rounded-full
                  transition

                  hover:bg-primary-dark

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white/70
                "
                aria-label="Close chat"
                title="Close chat"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* ==================================================
              MESSAGES
          ================================================== */}
          <div
            className="
              min-h-0
              flex-1

              overflow-y-auto
              overscroll-contain

              bg-gray-50

              p-2.5

              sm:p-3
            "
          >
            {messages.map((message, index) => {
              if (message.type === "itinerary") {
                return (
                  <div
                    key={`itinerary-${index}`}
                    className="mb-2.5 last:mb-0"
                  >
                    <ItineraryCard
                      itinerary={message.itinerary}
                    />
                  </div>
                );
              }

              return (
                <div
                  key={`${message.role}-${index}`}
                  className="mb-2.5 last:mb-0"
                >
                  <ChatMessage message={message} />
                </div>
              );
            })}

            {isLoading && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          {/* ==================================================
              INPUT
          ================================================== */}
          <form
            onSubmit={handleSubmit}
            className="
              shrink-0

              border-t
              border-gray-200

              bg-white

              p-2
              sm:p-2.5
            "
          >
            <div className="flex w-full items-center gap-1.5">
              {/* Input */}
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder={
                  isLoading
                    ? "Assistant is typing..."
                    : "Type a message..."
                }
                className="
                  min-w-0
                  flex-1

                  rounded-lg
                  border
                  border-gray-300

                  px-3
                  py-2

                  text-xs
                  text-gray-900

                  outline-none
                  transition

                  placeholder:text-gray-400

                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/20

                  disabled:cursor-not-allowed
                  disabled:bg-gray-100

                  sm:py-2.5
                  sm:text-sm
                "
              />

              {/* Send */}
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center

                  rounded-lg

                  bg-primary
                  text-white

                  transition

                  hover:bg-primary-dark

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-primary/40

                  disabled:cursor-not-allowed
                  disabled:opacity-50

                  sm:h-10
                  sm:w-10
                "
                aria-label="Send message"
              >
                <FiSend className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ==================================================
          FLOATING CHAT BUTTON
      ================================================== */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="
            fixed
            z-50

            bottom-4
            right-4

            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-full

            bg-primary
            text-white

            shadow-lg

            transition
            duration-200

            hover:scale-105
            hover:bg-primary-dark

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary/40

            sm:bottom-5
            sm:right-5
            sm:h-12
            sm:w-12

            md:bottom-6
            md:right-6
            md:h-13
            md:w-13
          "
          aria-label="Open travel assistant"
        >
          <FiMessageCircle
            className="
              h-5
              w-5

              sm:h-5
              sm:w-5

              md:h-5.5
              md:w-5.5
            "
          />
        </button>
      )}
    </>
  );
};

export default TravelChatbot;

