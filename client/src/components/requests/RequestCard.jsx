function RequestCard({

  request,
  onAccept,
  onReject,
  onDelete,

}) {

  return (

    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-2">

        {request.sender?.name}

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
        {request.status}

      </p>

      <div className="flex gap-3">

        <button
          onClick={() =>
            onAccept(request._id)
          }
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Accept
        </button>

        <button
          onClick={() =>
            onReject(request._id)
          }
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
        >
          Reject
        </button>

        <button
          onClick={() =>
            onDelete(request._id)
          }
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>

  );

}

export default RequestCard;