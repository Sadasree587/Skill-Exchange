import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProfile } from "../services/userService";

function Navbar() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const data = await getProfile();

        setUser(data);

      } catch (error) {

        console.log(error);

      }
    };

    fetchProfile();

  }, []);

  const handleLogout = () => {

    localStorage.clear();

    navigate("/login");
  };

  return (

    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 25px",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#ffffff",
      }}
    >

      {/* Left */}

      <div>

        <h2>
          🎓 Skill Exchange
        </h2>

      </div>

      {/* Center */}

      <div>

        <input
          type="text"
          placeholder="Search Skills..."
        />

      </div>

      {/* Right */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >

        <span>🔔</span>

        <span>
          {user?.name || "User"}
        </span>

        <span>👤</span>

        <button
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;