function ChatUserCard({

  user,
  selectedUser,
  setSelectedUser,

}) {

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
          selectedUser?._id ===
          user._id

            ? "bg-blue-500 text-white border-blue-500"

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

        <div>

          <h2 className="font-bold">

            {user.name}

          </h2>

          <p
            className={`
              text-sm
              ${
                selectedUser?._id ===
                user._id
                  ? "text-blue-100"
                  : "text-gray-500"
              }
            `}
          >

            {user.location ||
              "Unknown"}

          </p>

        </div>

      </div>

    </div>

  );

}

export default ChatUserCard;