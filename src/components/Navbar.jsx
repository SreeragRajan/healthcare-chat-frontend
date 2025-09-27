import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useTheme from "../hooks/useTheme.js";
import { Moon, ShieldPlus, Sun, Menu, X } from "lucide-react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 text-black dark:text-white border-b border-black/10 dark:border-gray-700 transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
            <ShieldPlus />
          </div>
          <h1 className="text-lg md:text-xl font-bold">HealthChat</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-black/60 dark:text-gray-300">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "font-semibold text-black dark:text-white" : "font-normal"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/documents"
            className={({ isActive }) =>
              isActive ? "font-semibold text-black dark:text-white" : "font-normal"
            }
          >
            Documents
          </NavLink>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              isActive ? "font-semibold text-black dark:text-white" : "font-normal"
            }
          >
            Chat
          </NavLink>
          {/* Theme Toggle */}
          <div
            onClick={toggleTheme}
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            className="h-10 w-10 ml-4 cursor-pointer rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center transition-colors duration-300"
          >
            {theme === "light" ? (
              <Sun className="text-yellow-400" />
            ) : (
              <Moon className="text-blue-300" />
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Theme Toggle on mobile */}
          <div
            onClick={toggleTheme}
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            className="h-10 w-10 cursor-pointer rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center transition-colors duration-300"
          >
            {theme === "light" ? (
              <Sun className="text-yellow-400" />
            ) : (
              <Moon className="text-blue-300" />
            )}
          </div>
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden h-[50vh] bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="h-full flex flex-col items-center justify-center px-4 py-3 gap-6 text-2xl">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "block font-semibold text-black dark:text-white"
                  : "block font-normal text-black/70 dark:text-gray-300"
              }
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/documents"
              className={({ isActive }) =>
                isActive
                  ? "block font-semibold text-black dark:text-white"
                  : "block font-normal text-black/70 dark:text-gray-300"
              }
              onClick={() => setMenuOpen(false)}
            >
              Documents
            </NavLink>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                isActive
                  ? "block font-semibold text-black dark:text-white"
                  : "block font-normal text-black/70 dark:text-gray-300"
              }
              onClick={() => setMenuOpen(false)}
            >
              Chat
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
