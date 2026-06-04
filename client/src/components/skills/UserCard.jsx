import { useState } from "react";

function UserCard({
  user,
  onSendRequest,
}) {

  const [loading, setLoading] =
    useState(false);

  const handleRequest =
    async () => {

      if (loading) return;

      setLoading(true);

      try {

        await onSendRequest(user);

      } catch (error) {

        console.log(
          "Request failed",
          error
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">

      {/* Header */}

      <div className="flex items-center gap-4 mb-4">

        <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-2xl">

          👤

        </div>

        <div>

          <h2 className="text-xl font-bold">

            {user.name}

          </h2>

          <p className="text-gray-500">

            {
              user.location ||
              "Location Not Added"
            }

          </p>

        </div>

      </div>

      {/* Bio */}

      <p className="mb-4 text-gray-700">

        {
          user.bio ||
          "No Bio Available"
        }

      </p>

      {/* Skills Offered */}

      <div className="mb-4">

        <h3 className="font-semibold mb-2">

          Skills Offered

        </h3>

        <div className="flex flex-wrap gap-2">

          {

            user.skillsOffered?.length > 0

            ? user.skillsOffered.map(
                (skill) => (

                  <span
                    key={skill}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >

                    {skill}

                  </span>

                )
              )

            : (

              <span className="text-gray-500">

                No Skills

              </span>

            )

          }

        </div>

      </div>

      {/* Skills Wanted */}

      <div className="mb-5">

        <h3 className="font-semibold mb-2">

          Skills Wanted

        </h3>

        <div className="flex flex-wrap gap-2">

          {

            user.skillsWanted?.length > 0

            ? user.skillsWanted.map(
                (skill) => (

                  <span
                    key={skill}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                  >

                    {skill}

                  </span>

                )
              )

            : (

              <span className="text-gray-500">

                No Skills

              </span>

            )

          }

        </div>

      </div>

      {/* Action Button */}

      <button

        onClick={handleRequest}

        disabled={loading}

        className={`w-full py-2 rounded-lg text-white transition-all duration-200 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}

      >

        {

          loading

          ? "Sending..."

          : "Send Swap Request"

        }

      </button>

    </div>

  );

}

export default UserCard;