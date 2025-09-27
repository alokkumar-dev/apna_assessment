import React from 'react'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProfilePage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 mt-12">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">Welcome, {user?.fullName}</h1>
        <p className="text-center text-gray-600 mb-8">Email: {user?.email}</p>

      </div>
    </div>
  );
}

export default ProfilePage;