const ChatMessage = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
          isUser
            ? "rounded-br-md bg-primary text-white"
            : "rounded-bl-md bg-gray-100 text-gray-800"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;