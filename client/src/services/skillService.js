import api from "../api/axios";

export const getAllUsers = async () => {

  const token = localStorage.getItem("token");

  const response = await api.get(
    "/skills/users",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const searchUsersBySkill = async (skill) => {

  const token = localStorage.getItem("token");

  const response = await api.get(
    `/skills/search?skill=${skill}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};