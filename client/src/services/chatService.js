import api from "../api/axios";

export const getMessages = async (
  userId
) => {

  const token =
    localStorage.getItem("token");

  const response =
    await api.get(

      `/messages/${userId}`,

      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }

    );

  return response.data;

};

export const sendMessage =
  async (
    receiver,
    message
  ) => {

    const token =
      localStorage.getItem("token");

    const response =
      await api.post(

        "/messages/send",

        {
          receiver,
          message,
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }

      );

    return response.data;

  };