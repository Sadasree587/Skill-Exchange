function MessageBubble({

  message,
  currentUserId,

}) {

  const isMine =
    message?.sender?._id ===
    currentUserId;

  return (

    <div

      className={`
        flex
        mb-4
        ${
          isMine
            ? "justify-end"
            : "justify-start"
        }
      `}
    >

      <div

        className={`
          max-w-[70%]
          px-4
          py-3
          rounded-2xl
          shadow-sm
          break-words

          ${
            isMine
              ? "bg-blue-500 text-white rounded-br-md"
              : "bg-gray-200 text-gray-800 rounded-bl-md"
          }
        `}
      >

        <p className="text-sm">

          {message?.message}

        </p>

        <p

          className={`
            text-xs
            mt-2
            text-right
            ${
              isMine
                ? "text-blue-100"
                : "text-gray-500"
            }
          `}
        >

          {message?.createdAt
            ? new Date(
                message.createdAt
              ).toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )
            : ""}

        </p>

      </div>

    </div>

  );

}

export default MessageBubble;