import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-10 flex flex-col items-center space-y-8">
      <h1 className="text-4xl font-bold text-center">Play Predictor Dashboard</h1>

      <p className="text-lg text-gray-700 text-center max-w-2xl">
        Welcome to the Play Predictor main dashboard.  
        Use the buttons below to navigate to different analysis tools.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          onClick={() => navigate("/offense")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
        >
          Go to Offensive Dashboard
        </button>

        <button
          onClick={() => navigate("/defense")}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
        >
          Go to Defensive Dashboard
        </button>

        <button
          onClick={() => navigate("/playdrawing")}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
        >
          Go to Play Drawing Board
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
