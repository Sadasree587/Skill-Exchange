import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Skills from "../pages/Skills";
import Requests from "../pages/Requests";
import Chat from "../pages/Chat";
import Notifications from "../pages/Notifications";
import Admin from "../pages/Admin";
import NotFound from "../pages/NotFound";
import AdminRoute from "./AdminRoute";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/skills"
          element={
            <ProtectedRoute>
              <Skills />
            </ProtectedRoute>
          }
        />

        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <Requests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
             <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
           <AdminRoute>
             <Admin />
           </AdminRoute>
          }
        />
 
        <Route
          path="*"
          element={<NotFound />}
        />
        
      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;