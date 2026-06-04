function RequestCard({

  request,
  onAccept,
  onReject,
  onDelete,

}) {

  return (

    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-2">

        {request.sender?.name || "Unknown User"}

      </h2>

      <p className="mb-2">

        <strong>Offers:</strong>
        {" "}
        {request.offeredSkill}

      </p>

      <p className="mb-4">

        <strong>Wants:</strong>
        {" "}
        {request.wantedSkill}

      </p>

      <p className="mb-4">

        <strong>Status:</strong>
        {" "}

        <span
          className={
            request.status === "accepted"
              ? "text-green-600 font-bold"
              : request.status === "rejected"
              ? "text-red-600 font-bold"
              : "text-yellow-600 font-bold"
          }
        >

          {request.status}

        </span>

      </p>

      <div className="flex gap-3">

        {request.status === "pending" && (

          <>

            <button
              onClick={() =>
                onAccept(request._id)
              }
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Accept
            </button>

            <button
              onClick={() =>
                onReject(request._id)
              }
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Reject
            </button>

          </>

        )}

        <button
          onClick={() =>
            onDelete(request._id)
          }
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>

      </div>

    </div>

  );

}

export default RequestCard;