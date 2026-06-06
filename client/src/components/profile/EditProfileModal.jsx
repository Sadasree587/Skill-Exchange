import { useState } from "react";

import {
  updateProfile,
} from "../../services/userService";

function EditProfileModal({

  user,
  setUser,
  closeModal,

}) {

  const [formData, setFormData] =
    useState({

      name:
        user?.name || "",

      bio:
        user?.bio || "",

      location:
        user?.location || "",

      skillsOffered:
        user?.skillsOffered?.join(", ") || "",

      skillsWanted:
        user?.skillsWanted?.join(", ") || "",

    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

        const updatedData =
          await updateProfile({

            name:
              formData.name,

            bio:
              formData.bio,

            location:
              formData.location,

            skillsOffered:
              formData.skillsOffered

                .split(",")

                .map((skill) =>
                  skill.trim()
                )

                .filter(
                  (skill) =>
                    skill !== ""
                ),

            skillsWanted:
              formData.skillsWanted

                .split(",")

                .map((skill) =>
                  skill.trim()
                )

                .filter(
                  (skill) =>
                    skill !== ""
                ),

          });

        setUser(updatedData);

        closeModal();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to update profile"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div
      className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
    "
    >

      <div
        className="
        bg-white
        rounded-2xl
        shadow-xl
        p-8
        w-[500px]
      "
      >

        <h2
          className="
          text-3xl
          font-bold
          mb-6
        "
        >
          Edit Profile
        </h2>

        <form
          onSubmit={
            handleSubmit
          }
          className="
          flex
          flex-col
          gap-4
        "
        >

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={
              formData.name
            }
            onChange={
              handleChange
            }
            className="
            border
            p-3
            rounded-lg
          "
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={
              formData.location
            }
            onChange={
              handleChange
            }
            className="
            border
            p-3
            rounded-lg
          "
          />

          <textarea
            name="bio"
            placeholder="Bio"
            value={
              formData.bio
            }
            onChange={
              handleChange
            }
            rows="3"
            className="
            border
            p-3
            rounded-lg
          "
          />

          <input
            type="text"
            name="skillsOffered"
            placeholder="React, Node.js"
            value={
              formData.skillsOffered
            }
            onChange={
              handleChange
            }
            className="
            border
            p-3
            rounded-lg
          "
          />

          <input
            type="text"
            name="skillsWanted"
            placeholder="AI, System Design"
            value={
              formData.skillsWanted
            }
            onChange={
              handleChange
            }
            className="
            border
            p-3
            rounded-lg
          "
          />

          <div
            className="
            flex
            justify-end
            gap-3
            mt-3
          "
          >

            <button
              type="button"
              onClick={
                closeModal
              }
              className="
              px-5
              py-2
              rounded-lg
              bg-gray-300
            "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loading
              }
              className="
              px-5
              py-2
              rounded-lg
              bg-blue-500
              text-white
              hover:bg-blue-600
            "
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default EditProfileModal;