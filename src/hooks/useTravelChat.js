import { useState } from "react";

const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Hi! 👋 I'm your Travel Unbounded assistant. Where would you like to travel?",
};

const useTravelChat = () => {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    const trimmedInput = input.trim();

    if (!trimmedInput || isLoading) {
      return;
    }

    const userMessage = {
      role: "user",
      content: trimmedInput,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to get a response from the AI."
        );
      }

      if (data.type === "itinerary") {
        setMessages((previousMessages) => [
          ...previousMessages,
          {
            role: "assistant",
            type: "itinerary",
            itinerary: data.itinerary,
          },
        ]);

        return;
      }

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      console.error("Travel chat error:", error);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble planning your trip right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
    setIsLoading(false);
  };

  return {
    messages,
    input,
    isLoading,
    handleInputChange,
    sendMessage,
    resetChat,
  };
};

export default useTravelChat;