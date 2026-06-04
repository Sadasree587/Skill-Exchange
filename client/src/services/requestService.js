import api from "../api/axios";

const getHeaders = () => {

  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

};

export const sendSwapRequest = async (data) => {

  const response = await api.post(
    "/requests/send",
    data,
    getHeaders()
  );

  return response.data;

};

export const getReceivedRequests = async () => {

  const response = await api.get(
    "/requests/received",
    getHeaders()
  );

  return response.data;

};

export const getSentRequests = async () => {

  const response = await api.get(
    "/requests/sent",
    getHeaders()
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
    getHeaders()
  );

  return response.data;

};

export const deleteRequest = async (
  requestId
) => {

  const response = await api.delete(
    `/requests/${requestId}`,
    getHeaders()
  );

  return response.data;

};