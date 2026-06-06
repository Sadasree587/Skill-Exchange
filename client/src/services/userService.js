import api from "../api/axios";

export const getProfile = async () => {

  const token = localStorage.getItem("token");

  const response = await api.get(
    "/users/profile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;

};

export const updateProfile = async (
  profileData
) => {

  const token = localStorage.getItem("token");

  const response = await api.put(

    "/users/profile",

    profileData,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

  );

  return response.data;

};