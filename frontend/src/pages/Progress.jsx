import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";

function Progress() {
  const { user } = useContext(AuthContext);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    if (user) {
      fetchProgress();
    }
  }, [user]);

  const fetchProgress = async () => {
    try {
      const res = await API.get(`/problems/progress`);
      setProgress(res.data);
    } catch (err) {
      console.error("Error fetching progress:", err);
    }
  };

  if (!progress) {
    return <div className="flex justify-center items-center h-screen"><p>Loading progress...</p></div>;
  }

  return (
    <div className="min-h-screen bg-teal-50 flex flex-col items-center py-10 mt-12">
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-xl w-full max-w-2xl border-t-4 border-teal-500">
        <h1 className="text-4xl font-extrabold text-teal-700 mb-8 text-center">Progress Reports</h1>
        <div className="space-y-6 text-xl text-gray-800">
          <p className="flex justify-between items-center bg-teal-100 p-4 rounded-lg shadow-sm">Easy: <span className="font-bold text-teal-600">{progress.Easy}%</span></p>
          <p className="flex justify-between items-center bg-teal-100 p-4 rounded-lg shadow-sm">Medium: <span className="font-bold text-teal-600">{progress.Medium}%</span></p>
          <p className="flex justify-between items-center bg-teal-100 p-4 rounded-lg shadow-sm">Hard: <span className="font-bold text-teal-600">{progress.Tough}%</span></p>
        </div>
      </div>
      <footer className="mt-12 text-teal-800 text-sm">
        &copy; {new Date().getFullYear()} Dashboard. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Progress;
