import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import AdminUserTable from "../components/admin/AdminUserTable";

import {
  getStats,
  getAllUsers,
  deleteUser,
} from "../services/adminService";

function Admin() {

  const [stats, setStats] =
    useState(null);

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      setLoading(true);

      await Promise.all([
        fetchStats(),
        fetchUsers(),
      ]);

    } catch (error) {

      console.log(error);

      setError(
        "Failed to load admin dashboard"
      );

    } finally {

      setLoading(false);

    }

  };

  const fetchStats = async () => {

    try {

      const data =
        await getStats();

      setStats(data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchUsers = async () => {

    try {

      const data =
        await getAllUsers();

      setUsers(data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete =
    async (userId) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this user?"
        );

      if (!confirmed) return;

      try {

        await deleteUser(userId);

        await fetchUsers();

        await fetchStats();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to delete user"
        );

      }

    };

  if (loading) {

    return (

      <DashboardLayout>

        <div className="p-6">

          <h2 className="text-2xl font-bold">

            Loading Admin Dashboard...

          </h2>

        </div>

      </DashboardLayout>

    );

  }

  if (error) {

    return (

      <DashboardLayout>

        <div className="p-6">

          <div className="bg-red-100 text-red-700 p-4 rounded-lg">

            {error}

          </div>

        </div>

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      <div className="p-6">

        <h1 className="text-4xl font-bold mb-8">

          Admin Dashboard

        </h1>

        {/* Statistics */}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl shadow-md p-6">

            <h3 className="text-gray-500 mb-2">

              Total Users

            </h3>

            <p className="text-4xl font-bold">

              {stats?.totalUsers || 0}

            </p>

          </div>

          <div className="bg-white rounded-xl shadow-md p-6">

            <h3 className="text-gray-500 mb-2">

              Total Requests

            </h3>

            <p className="text-4xl font-bold">

              {stats?.totalRequests || 0}

            </p>

          </div>

          <div className="bg-white rounded-xl shadow-md p-6">

            <h3 className="text-gray-500 mb-2">

              Total Messages

            </h3>

            <p className="text-4xl font-bold">

              {stats?.totalMessages || 0}

            </p>

          </div>

        </div>

        {/* User Management */}

        <div className="mt-10">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-2xl font-bold">

              User Management

            </h2>

            <p className="text-gray-500">

              {users.length} Users Found

            </p>

          </div>

          {users.length === 0 ? (

            <div className="bg-white rounded-xl shadow-md p-6">

              <p className="text-gray-500">

                No users found.

              </p>

            </div>

          ) : (

            <AdminUserTable
              users={users}
              onDelete={handleDelete}
            />

          )}

        </div>

      </div>

    </DashboardLayout>

  );

}

export default Admin;