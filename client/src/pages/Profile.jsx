import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
} from "../services/userService";

import DashboardLayout from "../layouts/DashboardLayout";

function Profile() {

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      setLoading(true);

      const data = await getProfile();

      setUser(data);

      setFormData({
        name: data.name || "",
        email: data.email || "",
        location: data.location || "",
        bio: data.bio || "",
        skillsOffered:
          data.skillsOffered?.join(", ") || "",
        skillsWanted:
          data.skillsWanted?.join(", ") || "",
      });

    } catch (err) {

      console.log(err);

      setError("Failed to load profile");

    } finally {

      setLoading(false);

    }

  };

  const validateForm = () => {

    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }

    if (formData.name.trim().length < 3) {
      setError(
        "Name must contain at least 3 characters"
      );
      return false;
    }

    if (formData.location.length > 50) {
      setError(
        "Location cannot exceed 50 characters"
      );
      return false;
    }

    if (formData.bio.length > 300) {
      setError(
        "Bio cannot exceed 300 characters"
      );
      return false;
    }

    return true;

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setIsDirty(true);

  };

  const handleUpdate = async () => {

    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    try {

      setSaving(true);

      const payload = {

        name: formData.name,

        location: formData.location,

        bio: formData.bio,

        skillsOffered:
          formData.skillsOffered
            .split(",")
            .map((skill) =>
              skill.trim()
            )
            .filter(Boolean),

        skillsWanted:
          formData.skillsWanted
            .split(",")
            .map((skill) =>
              skill.trim()
            )
            .filter(Boolean),

      };

      const updated =
        await updateProfile(
          payload
        );

      setUser(updated);

      setSuccess(
        "Profile updated successfully."
      );

      setTimeout(() => {
        setSuccess("");
      }, 3000);

      setIsEditing(false);
      setIsDirty(false);

    } catch (err) {

      console.log(err);

      setError(
        "Failed to update profile"
      );

    } finally {

      setSaving(false);

    }

  };

  const handleCancel = () => {

    setFormData({
      name: user.name || "",
      email: user.email || "",
      location: user.location || "",
      bio: user.bio || "",
      skillsOffered:
        user.skillsOffered?.join(", ") || "",
      skillsWanted:
        user.skillsWanted?.join(", ") || "",
    });

    setError("");
    setSuccess("");

    setIsEditing(false);
    setIsDirty(false);

  };

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

  return (

    <DashboardLayout>

      <div className="p-6 max-w-4xl">

        {error && (

          <div className="mb-4 bg-red-100 text-red-700 p-3 rounded-lg">

            {error}

          </div>

        )}

        {success && (

          <div className="mb-4 bg-green-100 text-green-700 p-3 rounded-lg">

            {success}

          </div>

        )}

        {isDirty && isEditing && (

          <div className="mb-4 bg-yellow-100 text-yellow-700 p-3 rounded-lg">

            You have unsaved changes.

          </div>

        )}

        <div className="flex justify-center mb-6">

          <div
            className="
              w-24
              h-24
              rounded-full
              bg-gray-300
              flex
              items-center
              justify-center
              text-4xl
            "
          >
            👤
          </div>

        </div>

        <div className="flex justify-between mb-6">

          <h1 className="text-3xl font-bold">

            Profile

          </h1>

          {!isEditing ? (

            <button
              onClick={() => {
                setError("");
                setSuccess("");
                setIsEditing(true);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>

          ) : (

            <div className="flex gap-2">

              <button
                onClick={handleUpdate}
                disabled={
                  saving || !isDirty
                }
                className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : "Save"}
              </button>

              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

            </div>

          )}

        </div>

        <div className="bg-white p-6 rounded-xl shadow space-y-4">

          <div>

            <label className="font-semibold">
              Name
            </label>

            {isEditing ? (

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />

            ) : (

              <p>
                {user.name || "Not provided"}
              </p>

            )}

          </div>

          <div>

            <label className="font-semibold">
              Email
            </label>

            <p>{user.email}</p>

          </div>

          <div>

            <label className="font-semibold">
              Location
            </label>

            {isEditing ? (

              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />

            ) : (

              <p>
                {user.location ||
                  "Not provided"}
              </p>

            )}

          </div>

          <div>

            <label className="font-semibold">
              Bio
            </label>

            {isEditing ? (

              <>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />

                <p className="text-sm text-gray-500">

                  {formData.bio.length}/300

                </p>

              </>

            ) : (

              <p>
                {user.bio ||
                  "Not provided"}
              </p>

            )}

          </div>

          <div>

            <label className="font-semibold">
              Skills Offered
            </label>

            {isEditing ? (

              <input
                name="skillsOffered"
                value={
                  formData.skillsOffered
                }
                onChange={handleChange}
                placeholder="Example: React, Node.js, MongoDB"
                className="border p-2 w-full rounded"
              />

            ) : (

              <div className="flex flex-wrap gap-2 mt-2">

                {user.skillsOffered?.map(
                  (skill) => (

                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>

            )}

          </div>

          <div>

            <label className="font-semibold">
              Skills Wanted
            </label>

            {isEditing ? (

              <input
                name="skillsWanted"
                value={
                  formData.skillsWanted
                }
                onChange={handleChange}
                placeholder="Example: Docker, AWS, Kubernetes"
                className="border p-2 w-full rounded"
              />

            ) : (

              <div className="flex flex-wrap gap-2 mt-2">

                {user.skillsWanted?.map(
                  (skill) => (

                    <span
                      key={skill}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>

            )}

          </div>

        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mt-6">

          <h2 className="text-2xl font-bold mb-4">

            Profile Statistics

          </h2>

          <div className="space-y-2">

            <p>

              <strong>
                Skills Offered:
              </strong>{" "}

              {user.skillsOffered?.length || 0}

            </p>

            <p>

              <strong>
                Skills Wanted:
              </strong>{" "}

              {user.skillsWanted?.length || 0}

            </p>

            <p>

              <strong>
                Member Since:
              </strong>{" "}

              {user.createdAt
                ? new Date(
                    user.createdAt
                  ).toLocaleDateString()
                : "N/A"}

            </p>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default Profile;