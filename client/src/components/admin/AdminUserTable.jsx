function AdminUserTable({

  users,
  onDelete,

}) {

  return (

    <div className="bg-white rounded-xl shadow-md overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100 border-b">

              <th className="p-4 text-left font-semibold">
                User
              </th>

              <th className="p-4 text-left font-semibold">
                Email
              </th>

              <th className="p-4 text-left font-semibold">
                Role
              </th>

              <th className="p-4 text-left font-semibold">
                Skills Offered
              </th>

              <th className="p-4 text-left font-semibold">
                Skills Wanted
              </th>

              <th className="p-4 text-left font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {users.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="p-6 text-center text-gray-500"
                >
                  No Users Found
                </td>

              </tr>

            ) : (

              users.map((user) => (

                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          w-10
                          h-10
                          rounded-full
                          bg-gray-300
                          flex
                          items-center
                          justify-center
                        "
                      >
                        👤
                      </div>

                      <div>

                        <p className="font-semibold">

                          {user.name}

                        </p>

                        <p className="text-xs text-gray-500">

                          {user.location ||
                            "No Location"}

                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="p-4">

                    {user.email}

                  </td>

                  <td className="p-4">

                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm

                        ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }
                      `}
                    >

                      {user.role}

                    </span>

                  </td>

                  <td className="p-4">

                    {user.skillsOffered?.length || 0}

                  </td>

                  <td className="p-4">

                    {user.skillsWanted?.length || 0}

                  </td>

                  <td className="p-4">

                    <button

                      onClick={() =>
                        onDelete(user._id)
                      }

                      disabled={
                        user.role === "admin"
                      }

                      className={`
                        px-4
                        py-2
                        rounded-lg
                        text-white

                        ${
                          user.role === "admin"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        }
                      `}
                    >

                      Delete

                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default AdminUserTable;