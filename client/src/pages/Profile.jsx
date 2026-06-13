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

  const [isEditing, setIsEditing] =
    useState(false);

  const [isDirty, setIsDirty] =
    useState(false);

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
          data.skillsOffered?.join(", ") ||
          "",
        skillsWanted:
          data.skillsWanted?.join(", ") ||
          "",
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

    if (
      formData.name.trim().length < 3
    ) {
      setError(
        "Name must contain at least 3 characters"
      );
      return false;
    }

    if (
      formData.location.length > 50
    ) {
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
  
  const calculateProfileCompletion = () => {

    let completed = 0;

    if (user?.name) completed++;
    if (user?.email) completed++;
    if (user?.location) completed++;
    if (user?.bio) completed++;
    if (user?.skillsOffered?.length > 0)
      completed++;
    if (user?.skillsWanted?.length > 0)
      completed++;

    return Math.floor(
      (completed / 6) * 100
    );

  };

  const sanitizeInput = (value) => {

    return value
      .replace(/</g, "")
      .replace(/>/g, "")
      .trim();

  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        sanitizeInput(e.target.value),
    });

    setIsDirty(true);
  };

  const handleUpdate = async () => {
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    try {
      setSaving(true);

      const payload = {
        name: formData.name,
        location:
          formData.location,
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

      await updateProfile(
        payload
      );

      await fetchProfile();

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
        "Failed to update profile."
      );

      setTimeout(() => {
        setError("");
      }, 3000);

    } finally {
      setSaving(false);
    }
  };
  
  const preventSubmit = (e) => {

    if (e.key === "Enter") {

      e.preventDefault();

    }

  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      location:
        user.location || "",
      bio: user.bio || "",
      skillsOffered:
        user.skillsOffered?.join(
          ", "
        ) || "",
      skillsWanted:
        user.skillsWanted?.join(
          ", "
        ) || "",
    });

    setError("");
    setSuccess("");

    setIsEditing(false);
    setIsDirty(false);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <h2 className="text-2xl font-bold">
            Loading Profile...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto p-6">

        {/* Alerts */}

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

        {isEditing &&
          isDirty && (
            <div className="mb-4 bg-yellow-100 text-yellow-700 p-3 rounded-lg">
              You have unsaved
              changes.
            </div>
          )}

        {/* Header */}

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            <div className="flex items-center gap-5">

              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-5xl">

                {user?.name?.charAt(0).toUpperCase()}

              </div>

              <div>

                <h1 className="text-3xl font-bold">
                  {user.name}
                </h1>

                <p className="text-gray-500">
                  {user.email}
                </p>

              </div>

            </div>

            {!isEditing ? (
              <button
                onClick={() => {
                  setError("");
                  setSuccess("");
                  setIsEditing(
                    true
                  );
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">

                <button
                  onClick={
                    handleUpdate
                  }
                  disabled={
                    saving ||
                    !isDirty
                  }
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : "Save"}
                </button>

                <button
                  onClick={
                    handleCancel
                  }
                  className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
                >
                  Cancel
                </button>

              </div>
            )}

          </div>

        </div>

        {/* Profile Details */}

        <div className="bg-white rounded-xl shadow-md p-6 space-y-5">

          <div>

            <label className="font-semibold block mb-1">
              Name
            </label>

            {isEditing ? (
              <input
                name="name"
                value={
                  formData.name || ""
                }
                onChange={
                  handleChange
                }
                onKeyDown={preventSubmit}
                className="border p-2 w-full rounded-lg"
              />
            ) : (
              <p>
                {user.name ||
                  "Not Provided"}
              </p>
            )}

          </div>

          <div>

            <label className="font-semibold block mb-1">
              Email
            </label>

            <p>{user.email}</p>

          </div>

          <div>

            <label className="font-semibold block mb-1">
              Location
            </label>

            {isEditing ? (
              <>
                <input
                  name="location"
                  value={
                    formData.location || ""
                  }
                  onChange={
                    handleChange
                  }
                  onKeyDown={preventSubmit}
                  className="border p-2 w-full rounded-lg"
                />

                <p className="text-xs text-gray-500 mt-1">
                  {
                    formData.location
                      .length
                  }
                  /50
                </p>
              </>
            ) : (
              <p>
                {user.location ||
                  "Not Provided"}
              </p>
            )}

          </div>

          <div>

            <label className="font-semibold block mb-1">
              Bio
            </label>

            {isEditing ? (
              <>
                <textarea
                  rows="4"
                  name="bio"
                  value={
                    formData.bio
                  }
                  onChange={
                    handleChange
                  }
                  className="border p-2 w-full rounded-lg"
                />

                <p className="text-xs text-gray-500 mt-1">
                  {
                    formData.bio
                      .length
                  }
                  /300
                </p>
              </>
            ) : (
              <p>
                {user.bio ||
                  "Not Provided"}
              </p>
            )}

          </div>

          <div>

            <label className="font-semibold block mb-2">
              Skills Offered
            </label>

            {isEditing ? (
              <>
                <input
                   name="skillsOffered"
                   value={formData.skillsOffered || ""}
                   onChange={handleChange}
                   placeholder="React, Node.js, MongoDB"
                   onKeyDown={preventSubmit}
                   className="border p-2 w-full rounded-lg"
                />

                <p className="text-xs text-gray-500 mt-1">
                   {
                     formData.skillsOffered.length
                   }
                   /200
                 </p>
               </>
            ) : (
              <div className="flex flex-wrap gap-2">

                {user
                  .skillsOffered
                  ?.length >
                0 ? (
                  user.skillsOffered.map(
                    (
                      skill
                    ) => (
                      <span
                        key={
                          skill
                        }
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {
                          skill
                        }
                      </span>
                    )
                  )
                ) : (
                  <p className="text-gray-500 italic">
                      No Skills Added Yet
                  </p>
                )}

              </div>
            )}

          </div>

          <div>

            <label className="font-semibold block mb-2">
              Skills Wanted
            </label>

            {isEditing ? (
              <>
                <input
                    name="skillsWanted"
                    value={formData.skillsWanted || ""}
                    onChange={handleChange}
                    placeholder="AWS, Docker, Kubernetes"
                    onKeyDown={preventSubmit}
                    className="border p-2 w-full rounded-lg"
                  />

                  <p className="text-xs text-gray-500 mt-1">
                    {
                      formData.skillsWanted.length
                    }
                    /200
                  </p>
                </>
            ) : (
              <div className="flex flex-wrap gap-2">

                {user
                  .skillsWanted
                  ?.length >
                0 ? (
                  user.skillsWanted.map(
                    (
                      skill
                    ) => (
                      <span
                        key={
                          skill
                        }
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                      >
                        {
                          skill
                        }
                      </span>
                    )
                  )
                ) : (
                  <p className="text-gray-500 italic">
                      No Skills Added Yet
                  </p>
                )}

              </div>
            )}

          </div>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-3 gap-5 mt-6">

          <div className="bg-white rounded-xl shadow-md p-5 text-center">
            <h3 className="text-gray-500">
              Skills Offered
            </h3>
            <p className="text-sm text-gray-400">
             Total skills shared
            </p>
            <p className="text-3xl font-bold mt-2">
              {user
                .skillsOffered
                ?.length || 0}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 text-center">
            <h3 className="text-gray-500">
              Skills Wanted
            </h3>
            <p className="text-sm text-gray-400">
              Total skills to learn
            </p>
            <p className="text-3xl font-bold mt-2">
              {user
                .skillsWanted
                ?.length || 0}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 text-center">
            <h3 className="text-gray-500">
              Member Since
            </h3>
            <p className="text-lg font-bold mt-2">
              {user.createdAt
                ? new Date(
                    user.createdAt
                  ).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mt-6">

          <h2 className="text-2xl font-bold mb-4">

            Profile Completion

          </h2>

          <div className="w-full bg-gray-200 rounded-full h-4">

            <div
              className={
                calculateProfileCompletion() === 100
                 ? "bg-green-500 h-4 rounded-full transition-all"
                 : "bg-blue-500 h-4 rounded-full transition-all"
              }
              style={{
                width: `${calculateProfileCompletion()}%`,
              }}
            />

          </div>

          <p className="mt-3 text-lg font-semibold">
            {calculateProfileCompletion()}% Complete
          </p>

          {calculateProfileCompletion() < 100 && (
            <p className="text-sm text-gray-500 mt-2">
              Complete your profile to improve matching results.
            </p>
          )}

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Profile;