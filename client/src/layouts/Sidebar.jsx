import { NavLink } from "react-router-dom";

function Sidebar() {

  const navItems = [
    {
      path: "/dashboard",
      icon: "🏠",
      label: "Dashboard",
    },
    {
      path: "/profile",
      icon: "👤",
      label: "Profile",
    },
    {
      path: "/skills",
      icon: "🎯",
      label: "Skills",
    },
    {
      path: "/requests",
      icon: "🔄",
      label: "Requests",
    },
    {
      path: "/chat",
      icon: "💬",
      label: "Chat",
    },
    {
      path: "/notifications",
      icon: "🔔",
      label: "Notifications",
    },
  ];

  return (

    <div className="w-60 min-h-screen border-r bg-white p-5">

      <h2 className="text-xl font-bold mb-6">
        Menu
      </h2>

      <div className="flex flex-col gap-3">

        {navItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all
              ${
                isActive
                  ? "bg-blue-500 text-white font-semibold"
                  : "hover:bg-gray-100"
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>

        ))}

      </div>

    </div>

  );
}

export default Sidebar;