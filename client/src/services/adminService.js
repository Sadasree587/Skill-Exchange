import api from "../api/axios";

const getAuthConfig = () => {

  const token =
    localStorage.getItem("token");

  return {

    headers: {
      Authorization:
        `Bearer ${token}`,
    },

  };

};

// GET ADMIN STATS

export const getStats = async () => {

  const response =
    await api.get(

      "/admin/stats",

      getAuthConfig()

    );

  return response.data;

};

// GET ALL USERS

export const getAllUsers = async () => {

  const response =
    await api.get(

      "/admin/users",

      getAuthConfig()

    );

  return response.data;

};

// DELETE USER

export const deleteUser =
  async (userId) => {

    const response =
      await api.delete(

        `/admin/users/${userId}`,

        getAuthConfig()

      );

    return response.data;

  };