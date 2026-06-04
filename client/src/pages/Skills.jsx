import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import UserCard from "../components/skills/UserCard";

import {
  getAllUsers,
  searchUsersBySkill,
} from "../services/skillService";

import {
  sendSwapRequest,
} from "../services/requestService";

function Skills() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [requestingUserId, setRequestingUserId] =
    useState(null);

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const data = await getAllUsers();

        setUsers(data);

      } catch (error) {

        console.log(error);

        setError("Failed to load users");

      } finally {

        setLoading(false);

      }

    };

    fetchUsers();

  }, []);

  const handleSearch = async () => {

    setError("");

    try {

      if (!searchTerm.trim()) {

        const data = await getAllUsers();

        setUsers(data);

        return;

      }

      const data =
        await searchUsersBySkill(searchTerm);

      setUsers(data);

    } catch (error) {

      console.log(error);

      setError("Search failed");

    }

  };

  const handleSendRequest = async (user) => {

    setRequestingUserId(user._id);

    try {

      await sendSwapRequest({

        receiverId: user._id,

      });

      alert("Swap request sent successfully");

    } catch (error) {

      console.log(error);

      alert("Failed to send request");

    } finally {

      setRequestingUserId(null);

    }

  };

  if (loading) {

    return (

      <DashboardLayout>

        <div className="p-6">

          <h2 className="text-2xl font-bold">

            Loading Users...

          </h2>

        </div>

      </DashboardLayout>

    );

  }

  if (error) {

    return (

      <DashboardLayout>

        <div className="p-6">

          <h2 className="text-2xl font-bold text-red-500">

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

          Discover Skills

        </h1>

        <div className="flex gap-3 mb-6">

          <input
            type="text"
            placeholder="Search by skill..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="border rounded-lg px-4 py-2 w-full"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>

        </div>

        {

          users.length === 0

          ? (

            <div className="bg-white rounded-xl shadow-md p-8">

              <h2 className="text-2xl font-bold">

                No Users Found

              </h2>

            </div>

          )

          : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {

                users.map((user) => (

                  <UserCard

                    key={user._id}

                    user={user}

                    onSendRequest={
                      handleSendRequest
                    }

                    loadingUserId={
                      requestingUserId
                    }

                  />

                ))

              }

            </div>

          )

        }

      </div>

    </DashboardLayout>

  );

}

export default Skills;