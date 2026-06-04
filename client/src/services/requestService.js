import api from "../api/axios";

const getAuthConfig = () => {

  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

};

export const getReceivedRequests = async () => {

  const response = await api.get(
    "/requests/received",
    getAuthConfig()
  );

  return response.data;
};

export const getSentRequests = async () => {

  const response = await api.get(
    "/requests/sent",
    getAuthConfig()
  );

  return response.data;
};

export const updateRequestStatus = async (
  requestId,
  status
) => {

  const response = await api.put(

    `/requests/status/${requestId}`,

    {
      status,
    },

    getAuthConfig()

  );

  return response.data;
};

export const deleteRequest = async (
  requestId
) => {

  const response = await api.delete(

    `/requests/${requestId}`,

    getAuthConfig()

  );

  return response.data;
};

export const sendSwapRequest = async (
  receiverId,
  offeredSkill,
  wantedSkill
) => {

  const response = await api.post(

    "/requests/send",

    {
      receiverId,
      offeredSkill,
      wantedSkill,
    },

    getAuthConfig()

  );

  return response.data;

};