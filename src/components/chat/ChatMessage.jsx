const ChatMessage = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full min-w-0 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          min-w-0
          max-w-[90%]

          rounded-2xl
          px-3
          py-2

          text-xs
          leading-5

          wrap-break-word
          whitespace-pre-wrap

          sm:max-w-[85%]
          sm:px-4
          sm:py-2.5
          sm:text-sm
          sm:leading-6

          ${
            isUser
              ? "rounded-br-md bg-primary text-white"
              : "rounded-bl-md bg-gray-100 text-gray-800"
          }
        `}
      >
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;