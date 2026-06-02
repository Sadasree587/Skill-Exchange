import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import { getProfile } from "../services/userService";

function Dashboard() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const data = await getProfile();

        setUser(data);

      } catch (error) {

        console.log(error);

        setError("Failed to load profile");

      } finally {

        setLoading(false);

      }
    };

    fetchProfile();

  }, []);

  if (loading) {

    return (

      <DashboardLayout>

        <div className="p-6">

          <h1 className="text-2xl font-bold">
            Loading Dashboard...
          </h1>

        </div>

      </DashboardLayout>

    );
  }

  if (error) {

    return (

      <DashboardLayout>

        <div className="p-6">

          <h1 className="text-2xl font-bold text-red-500">
            {error}
          </h1>

        </div>

      </DashboardLayout>

    );
  }

  return (

    <DashboardLayout>

      <div className="p-6">

        <div className="bg-white shadow-md rounded-xl p-6 mb-6">

          <h1 className="text-3xl font-bold">

            Welcome Back,
            {" "}
            {user?.name} 👋

          </h1>

          <p className="text-gray-600 mt-2">

            {user?.email}

          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          <div className="bg-blue-100 p-6 rounded-xl shadow">

            <h2 className="text-xl font-semibold">
              Skills
            </h2>

            <p className="text-3xl font-bold">
              {user?.skillsOffered?.length || 0}
            </p>

          </div>

          <div className="bg-green-100 p-6 rounded-xl shadow">

            <h2 className="text-xl font-semibold">
              Wanted
            </h2>

            <p className="text-3xl font-bold">
              {user?.skillsWanted?.length || 0}
            </p>

          </div>

          <div className="bg-purple-100 p-6 rounded-xl shadow">

            <h2 className="text-xl font-semibold">
              Location
            </h2>

            <p className="text-xl font-bold">
              {user?.location}
            </p>

          </div>

        </div>

        <div className="bg-white shadow-md rounded-xl p-6">

          <h2 className="text-2xl font-semibold mb-4">
            Profile Summary
          </h2>

          <p>
            <strong>Bio:</strong>
            {" "}
            {user?.bio}
          </p>

          <br />

          <p>
            <strong>Skills Offered:</strong>
            {" "}
            {user?.skillsOffered?.join(", ")}
          </p>

          <br />

          <p>
            <strong>Skills Wanted:</strong>
            {" "}
            {user?.skillsWanted?.join(", ")}
          </p>

        </div>

      </div>

    </DashboardLayout>

  );
}

export default Dashboard;