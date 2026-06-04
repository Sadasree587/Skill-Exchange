import {

  useEffect,
  useState,

} from "react";

import DashboardLayout
from "../layouts/DashboardLayout";

import ChatUserCard
from "../components/chat/ChatUserCard";

import MessageBubble
from "../components/chat/MessageBubble";

import {
  getAllUsers,
} from "../services/skillService";

import {

  getMessages,
  sendMessage,

} from "../services/chatService";

function Chat() {

  const [users, setUsers] =
    useState([]);

  const [selectedUser,
    setSelectedUser] =
    useState(null);

  const [messages,
    setMessages] =
    useState([]);

  const [newMessage,
    setNewMessage] =
    useState("");

  const [loading,
    setLoading] =
    useState(true);

  const [error,
    setError] =
    useState("");

  const currentUserId =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    )?._id;

  useEffect(() => {

    fetchUsers();

  }, []);

  useEffect(() => {

    if (
      selectedUser
    ) {

      fetchMessages();

    }

  }, [selectedUser]);

  const fetchUsers =
    async () => {

      try {

        const data =
          await getAllUsers();

        setUsers(data);

      } catch (error) {

        console.log(error);

        setError(
          "Failed to load users"
        );

      } finally {

        setLoading(false);

      }

    };

  const fetchMessages =
    async () => {

      try {

        const data =
          await getMessages(
            selectedUser._id
          );

        setMessages(data);

      } catch (error) {

        console.log(error);

      }

    };

  const handleSendMessage =
    async () => {

      if (
        !newMessage.trim()
      )
        return;

      try {

        await sendMessage(

          selectedUser._id,

          newMessage

        );

        setNewMessage("");

        fetchMessages();

      } catch (error) {

        console.log(error);

      }

    };

  if (loading) {

    return (

      <DashboardLayout>

        <div className="p-6">

          <h2 className="text-2xl font-bold">

            Loading Chat...

          </h2>

        </div>

      </DashboardLayout>

    );

  }

  if (error) {

    return (

      <DashboardLayout>

        <div className="p-6">

          <h2 className="text-2xl text-red-500">

            {error}

          </h2>

        </div>

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      <div className="p-6">

        <h1 className="text-4xl font-bold mb-6">

          Chat

        </h1>

        <div className="grid grid-cols-12 gap-6">

          <div className="col-span-4">

            <div className="space-y-3">

              {users.map(
                (user) => (

                  <ChatUserCard

                    key={user._id}

                    user={user}

                    selectedUser={
                      selectedUser
                    }

                    setSelectedUser={
                      setSelectedUser
                    }

                  />

                )
              )}

            </div>

          </div>

          <div className="col-span-8">

            <div className="bg-white rounded-xl shadow-md h-[600px] flex flex-col">

              <div className="p-4 border-b">

                <h2 className="text-xl font-bold">

                  {

                    selectedUser

                      ? selectedUser.name

                      : "Select a User"

                  }

                </h2>

              </div>

              <div className="flex-1 overflow-y-auto p-4">

                {

                  selectedUser

                    ? messages.map(
                        (message) => (

                          <MessageBubble

                            key={
                              message._id
                            }

                            message={
                              message
                            }

                            currentUserId={
                              currentUserId
                            }

                          />

                        )
                      )

                    : (

                      <div className="text-gray-500">

                        Select a user to start chatting.

                      </div>

                    )

                }

              </div>

              {

                selectedUser &&

                <div className="border-t p-4 flex gap-3">

                  <input

                    type="text"

                    value={newMessage}

                    onChange={(e) =>

                      setNewMessage(
                        e.target.value
                      )

                    }

                    placeholder="Type message..."

                    className="flex-1 border rounded-lg px-4 py-2"

                  />

                  <button

                    onClick={
                      handleSendMessage
                    }

                    className="bg-blue-500 text-white px-6 rounded-lg"

                  >

                    Send

                  </button>

                </div>

              }

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default Chat;