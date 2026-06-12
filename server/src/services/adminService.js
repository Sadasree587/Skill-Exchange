import api from "../api/axios";

const getConfig = () => {

  const token =
    localStorage.getItem("token");

  return {

    headers: {

      Authorization:
        `Bearer ${token}`,

    },

  };

};

export const getAllUsers =
  async () => {

    const response =
      await api.get(
        "/admin/users",
        getConfig()
      );

    return response.data;

  };

export const deleteUser =
  async (id) => {

    const response =
      await api.delete(
        `/admin/users/${id}`,
        getConfig()
      );

    return response.data;

  };

export const getAllRequests =
  async () => {

    const response =
      await api.get(
        "/admin/requests",
        getConfig()
      );

    return response.data;

  };

export const deleteRequest =
  async (id) => {

    const response =
      await api.delete(
        `/admin/requests/${id}`,
        getConfig()
      );

    return response.data;

  };

export const getStats =
  async () => {

    const response =
      await api.get(
        "/admin/stats",
        getConfig()
      );

    return response.data;

  };