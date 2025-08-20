import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./ModeToggle"; // path to where you saved ModeToggle.tsx

const Navbar: React.FC = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("http://localhost:5000/api/user/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        localStorage.removeItem("token");
        navigate("/");
      })
      .catch((err) => console.error("Logout failed:", err));
  };

  return (
    <div className="flex">
      <nav className="bg-[#2b2b2b] dark:bg-gray-900 text-white dark:text-gray-100 w-full flex items-center px-6 py-2 shadow-md transition-colors duration-300">
        {/* Logo */}
        <div
          className="flex flex-col leading-tight cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <span className="font-bold text-lg tracking-wide">
            DEZIGN <span className="text-red-500">SHARK</span>
            <sup className="text-xs">®</sup>
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-300">
            ALL ABOUT DESIGN
          </span>
        </div>

        {/* Theme switcher */}
        <div className="ml-auto">
          <ModeToggle />
        </div>

        {/* Login / Logout */}
        {token ? (
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-white"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/"
            className="ml-4 bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-white"
          >
            Login
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;