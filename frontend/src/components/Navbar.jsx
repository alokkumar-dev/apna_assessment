import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="bg-teal-600 p-4 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/profile" className="text-2xl font-bold">
          Learning Material
        </Link>
        <div className="space-x-4">
          <Link to="/profile" className="hover:underline">Profile</Link>
          <Link to="/topics" className="hover:underline">Topics</Link>
          <Link to="/progress" className="hover:underline">Progress</Link>
          <button onClick={logout} className="hover:underline cursor-pointer">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
