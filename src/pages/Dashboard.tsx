// src/pages/Dashboard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <button
        onClick={() => navigate("/tendency")}
        className="bg-blue-600 text-white py-2 px-4 rounded mb-4"
      >
        Go to Tendency Dashboard
      </button>
      <button
        onClick={() => navigate("/drawing")}
        className="bg-green-600 text-white py-2 px-4 rounded"
      >
        Go to Play Drawing
      </button>
    </div>
  );
};

export default Dashboard;
