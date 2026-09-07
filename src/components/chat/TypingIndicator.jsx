const TypingIndicator = () => {
  return (
    <div className="flex w-full justify-start">
      <div
        className="
          rounded-2xl
          rounded-bl-md
          bg-gray-100

          px-3
          py-2.5

          sm:px-4
          sm:py-3
        "
      >
        <div
          className="
            flex
            items-center
            gap-1
            sm:gap-1.5
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              shrink-0
              animate-bounce
              rounded-full
              bg-gray-500

              sm:h-2
              sm:w-2

              [animation-delay:-0.3s]
            "
          />

          <span
            className="
              h-1.5
              w-1.5
              shrink-0
              animate-bounce
              rounded-full
              bg-gray-500

              sm:h-2
              sm:w-2

              [animation-delay:-0.15s]
            "
          />

          <span
            className="
              h-1.5
              w-1.5
              shrink-0
              animate-bounce
              rounded-full
              bg-gray-500

              sm:h-2
              sm:w-2
            "
          />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;