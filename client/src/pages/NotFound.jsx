import { Link } from "react-router-dom";

function NotFound() {

  return (

    <div className="min-h-screen flex flex-col justify-center items-center">

      <h1 className="text-7xl font-bold">

        404

      </h1>

      <p className="text-xl mt-4">

        Page Not Found

      </p>

      <Link
        to="/dashboard"
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded"
      >
        Go Dashboard
      </Link>

    </div>

  );

}

export default NotFound;