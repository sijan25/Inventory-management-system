import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const menuItems = [
    { icon: "🏠", label: "Home", path: "/dashboard" },
    { icon: "📦", label: "Products", path: "/products" },
    { icon: "📁", label: "Categories", path: "/categories" },
    { icon: "🏪", label: "Stores", path: "/stores" },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-600 to-indigo-700 text-black w-64 min-h-screen p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Inventario</h1>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`
              w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
              ${
                location.pathname === item.path
                  ? "bg-white bg-opacity-20 border-r-4 border-white"
                  : "hover:bg-white hover:bg-opacity-10"
              }
            `}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 bg-opacity-90 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-all duration-200 flex items-center space-x-3"
        >
          <span className="text-lg">🚪</span>
          <span className="font-medium">Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
