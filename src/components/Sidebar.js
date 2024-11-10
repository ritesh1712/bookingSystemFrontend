import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contextApi/AuthContext";
import { useUser } from "../contextApi/userContext";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  let location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const { user } = useUser();

  const role = user?.role || JSON.parse(localStorage.getItem("user"))?.role;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <div className="md:flex  w-full overflow-x-hidden">
      <div
        className={`fixed z-10 top-0 left-0 h-full w-auto bg-gray-800 text-white md:w-1/5 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-64 md:flex-shrink-0`}
        >
        <div className="p-4 font-bold text-2xl md:hidden">Booking System</div>
        <button onClick={()=>setIsOpen(false)} className="md:hidden w-full text-right pr-6">
          <i className="material-icons">close</i>
        </button>
        <nav onClick={()=>setIsOpen(false)} className="flex flex-col p-4 space-y-2 text-nowrap">
          <Link
            to="/"
            className={`p-2 hover:bg-gray-700 rounded ${
              location.pathname === "/" && "bg-gray-700"
            } `}
          >
            Dashboard
          </Link>
          {role !== "Student" && (
            <Link
              to="/setAvailability"
              className={`p-2 hover:bg-gray-700 rounded ${
                location.pathname === "/setAvailability" && "bg-gray-700"
              } `}
            >
              Set Availability
            </Link>
          )}
          <Link
            to="/profile"
            className={`p-2 hover:bg-gray-700 rounded ${
              location.pathname === "/profile" && "bg-gray-700"
            } `}
          >
            Profile
          </Link>

          {isAuthenticated ? (
            <div
              onClick={handleLogout}
              className="p-2 hover:bg-gray-700 rounded cursor-pointer"
            >
              Log out
            </div>
          ) : (
            <>
              <Link
                to="/signup"
                className={`p-2 hover:bg-gray-700 rounded ${
                  location.pathname === "/signup" && "bg-gray-700"
                } `}
              >
                Sign Up
              </Link>
              <Link
                to="/signin"
                className={`p-2 hover:bg-gray-700 rounded ${
                  location.pathname === "/signin" && "bg-gray-700"
                } `}
              >
                Sign In
              </Link>
            </>
          )}
        </nav>
      </div>

      <div className="md:hidden p-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-800 bg-gray-200 py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <i className="material-icons">menu</i>
        </button>
      </div>
      <div className="md:w-4/5 w-full">{children}</div>
    </div>
  );
};

export default Sidebar;
