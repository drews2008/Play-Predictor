import React from "react";
import { useNavigate } from "react-router-dom";
import OffensiveTendencies from "../components/offense/OffensiveTendencies"; // adjust path if needed

const OffensiveDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex flex-col items-center">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="self-start mb-6 flex items-center gap-2 px-5 py-2.5 
                   bg-white text-blue-700 font-medium shadow-md rounded-xl 
                   border border-blue-200 hover:bg-blue-700 hover:text-white 
                   hover:shadow-lg transition duration-200 ease-in-out"
      >
        <span className="text-lg">←</span>
        Back to Dashboard
      </button>

      {/* Page title */}
      <h1 className="text-4xl font-extrabold mb-8 text-blue-800 tracking-tight drop-shadow-sm">
        Offensive Dashboard
      </h1>

      {/* Container for OffensiveTendencies component */}
      <div className="w-full max-w-6xl space-y-6">
        <OffensiveTendencies />
      </div>
    </div>
  );
};

export default OffensiveDashboard;
