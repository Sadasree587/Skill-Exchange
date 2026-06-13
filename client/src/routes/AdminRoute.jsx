import { Navigate } from "react-router-dom";

function AdminRoute({ children, }) {

  const token =
    localStorage.getItem("token");

  const storedUser =
    localStorage.getItem("user");

  if (!token) {

    return (
      <Navigate to="/login" />
    );

  }

  if (!storedUser) {

    return (
      <Navigate to="/dashboard" />
    );

  }

  const user =
  JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (
    user.role !== "admin"
  ) {

    return (
      <Navigate to="/dashboard" />
    );

  }

  return children;

}

export default AdminRoute;