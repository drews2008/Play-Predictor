import React from "react";
import { useNavigate } from "react-router-dom";

// Reusable navigation button
const DashboardButton: React.FC<{ to: string; text: string }> = ({ to, text }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className="w-full md:w-auto text-white px-6 py-3 rounded shadow-lg font-semibold transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white bg-blue-700 hover:bg-blue-800"
    >
      {text}
    </button>
  );
};

const MainDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-700 flex items-center justify-center p-6">
      {/* White card container */}
      <div className="bg-blue rounded-xl shadow-2xl p-10 w-full max-w-4xl text-center">
        <h1 className="text-4xl font-extrabold mb-8 text-blue-800">Main Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardButton to="/tendency" text="Offensive Dashboard" />
          <DashboardButton to="/defensivetendencies" text="Defensive Dashboard" />
          <DashboardButton to="/playdrawing" text="Play Drawing Tab" />
        </div>
      </div>

      {/* Footer below card */}
      <footer className="absolute bottom-4 text-white text-sm w-full text-center">
        &copy; {new Date().getFullYear()} PlayPredictor
      </footer>
    </div>
  );
};

export default MainDashboard;
