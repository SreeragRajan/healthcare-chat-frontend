import React from "react";
import { NavLink } from "react-router-dom";
import useTheme from "../hooks/useTheme.js";
import { Moon, ShieldPlus, Sun } from "lucide-react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 left-0 w-full px-6 py-3 z-50 flex items-center justify-between whitespace-nowrap border-b border-black/10 dark:border-gray-700 bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Logo */}
      <div className="logo flex items-center">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white mr-2">
          <ShieldPlus />
        </div>
        <h1 className="text-xl font-bold">HealthChat</h1>
      </div>

      {/* Nav Items */}
      <div className="nav-items flex items-center gap-6 text-black/60 dark:text-gray-300">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-black dark:text-white"
              : "font-normal"
          }
        >
          Home
        </NavLink>

        <NavLink
          to={"/documents"}
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-black dark:text-white"
              : "font-normal"
          }
        >
          Documents
        </NavLink>

        <NavLink
          to={"/chat"}
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-black dark:text-white"
              : "font-normal"
          }
        >
          Chat
        </NavLink>

        {/* Theme Toggle Button */}
        <div
          onClick={toggleTheme}
          title={
            theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"
          }
          className="h-10 w-10 ml-4 cursor-pointer rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center transition-colors duration-300"
        >
          {theme === "light" ? (
            <Sun className="text-yellow-400" />
          ) : (
            <Moon className="text-blue-300" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
