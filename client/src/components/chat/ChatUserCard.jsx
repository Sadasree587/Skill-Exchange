function ChatUserCard({

  user,
  selectedUser,
  setSelectedUser,

}) {

  const isSelected =
    selectedUser?._id ===
    user._id;

  return (

    <div

      onClick={() =>
        setSelectedUser(user)
      }

      className={`
        p-4
        rounded-xl
        cursor-pointer
        shadow-sm
        transition-all
        border

        ${
          isSelected

            ? "bg-blue-500 text-white border-blue-500 scale-[1.02]"

            : "bg-white hover:bg-gray-100 border-gray-200"
        }
      `}

    >

      <div className="flex items-center gap-3">

        <div
          className="
            w-12
            h-12
            rounded-full
            bg-gray-300
            flex
            items-center
            justify-center
            text-xl
          "
        >
          👤
        </div>

        <div className="flex-1">

          <h2 className="font-bold">

            {user.name}

          </h2>

          <p
            className={`
              text-sm
              ${
                isSelected
                  ? "text-blue-100"
                  : "text-gray-500"
              }
            `}
          >

            {user.location ||
              "Unknown"}

          </p>

          <p
            className={`
              text-xs
              mt-1
              font-medium
              ${
                isSelected
                  ? "text-blue-100"
                  : "text-blue-600"
              }
            `}
          >

            🎯 Match Score:
            {" "}
            {user.matchScore || 0}

          </p>

        </div>

      </div>

    </div>

  );

}

export default ChatUserCard;