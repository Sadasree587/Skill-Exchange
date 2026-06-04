import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import RequestCard from "../components/requests/RequestCard";

import {

  getReceivedRequests,
  updateRequestStatus,
  deleteRequest,

} from "../services/requestService";

function Requests() {

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    fetchRequests();

  }, []);

  const fetchRequests = async () => {

    try {

      const data =
        await getReceivedRequests();

      setRequests(data);

    } catch (error) {

      console.log(error);

      setError(
        "Failed to load requests"
      );

    } finally {

      setLoading(false);

    }

  };

  const handleAccept =
    async (id) => {

      await updateRequestStatus(
        id,
        "accepted"
      );

      fetchRequests();

    };

  const handleReject =
    async (id) => {

      await updateRequestStatus(
        id,
        "rejected"
      );

      fetchRequests();

    };

  const handleDelete =
    async (id) => {

      await deleteRequest(id);

      fetchRequests();

    };

  if (loading) {

    return (

      <DashboardLayout>

        <div className="p-6">

          <h2 className="text-2xl font-bold">

            Loading Requests...

          </h2>

        </div>

      </DashboardLayout>

    );

  }

  if (error) {

    return (

      <DashboardLayout>

        <div className="p-6">

          <h2 className="text-2xl text-red-500">

            {error}

          </h2>

        </div>

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      <div className="p-6">

        <h1 className="text-4xl font-bold mb-6">

          Received Requests

        </h1>

        {requests.length === 0 ? (

          <div className="bg-white rounded-xl p-8 shadow-md">

            <h2 className="text-2xl font-bold">

              No Requests Found

            </h2>

          </div>

        ) : (

          <div className="grid gap-6">

            {requests.map(
              (request) => (

                <RequestCard
                  key={request._id}
                  request={request}
                  onAccept={
                    handleAccept
                  }
                  onReject={
                    handleReject
                  }
                  onDelete={
                    handleDelete
                  }
                />

              )
            )}

          </div>

        )}

      </div>

    </DashboardLayout>

  );

}

export default Requests;