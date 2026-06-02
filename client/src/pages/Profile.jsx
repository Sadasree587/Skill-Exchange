import { useEffect, useState } from "react";
import { getProfile } from "../services/userService";

import DashboardLayout from "../layouts/DashboardLayout";

function Profile() {

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

          <h2 className="text-2xl font-bold">
            Loading Profile...
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

        <div className="bg-white rounded-xl shadow-md p-6">

          <h1 className="text-3xl font-bold mb-4">
            Profile
          </h1>

          <p>
            <strong>Name:</strong>{" "}
            {user.name}
          </p>

          <br />

          <p>
            <strong>Email:</strong>{" "}
            {user.email}
          </p>

          <br />

          <p>
            <strong>Location:</strong>{" "}
            {user.location}
          </p>

          <br />

          <p>
            <strong>Bio:</strong>{" "}
            {user.bio}
          </p>

          <br />

          <p>
            <strong>Skills Offered:</strong>{" "}
            {user.skillsOffered?.join(", ")}
          </p>

          <br />

          <p>
            <strong>Skills Wanted:</strong>{" "}
            {user.skillsWanted?.join(", ")}
          </p>

        </div>

      </div>

    </DashboardLayout>

  );
}

export default Profile;