import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardButton: React.FC<{ to: string; text: string }> = ({ to, text }) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      className="w-full rounded-xl border border-blue-500 bg-gradient-to-r from-blue-700 to-blue-800 px-6 py-3 font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:from-blue-800 hover:to-blue-900 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      {text}
    </button>
  );
};

const MainDashboard: React.FC = () => {
  return (
    <div className="rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-700 to-blue-900 p-6 md:p-10">
      <div className="mx-auto w-full max-w-4xl rounded-xl border border-blue-100 bg-white p-8 text-center shadow-2xl md:p-10">
        <h1 className="mb-8 text-4xl font-extrabold text-blue-900">Main Dashboard</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <DashboardButton to="/offense" text="Offensive Dashboard" />
          <DashboardButton to="/defense" text="Defensive Dashboard" />
          <DashboardButton to="/playdrawing" text="Play Drawing Tab" />
        </div>

        <footer className="mt-8 text-sm text-blue-800/80">
          &copy; {new Date().getFullYear()} PlayPredictor
        </footer>
      </div>
    </div>
  );
};

export default MainDashboard;
