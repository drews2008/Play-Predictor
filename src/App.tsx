import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import MainDashboard from "./pages/MainDashboard";
import OffensiveDashboard from "./pages/OffensiveDashboard";
import DefensiveDashboard from "./pages/DefensiveDashboard";
import PlayDrawing from "./pages/PlayDrawingPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-blue-50 text-blue-950">
        <nav className="bg-blue-800 text-white px-4 py-3 flex items-center justify-between shadow-md border-b border-blue-700">
          <h1 className="text-xl font-bold">PlayPredictor Dashboard</h1>
          <div className="space-x-4">
            <Link to="/" className="hover:bg-blue-600 px-3 py-2 rounded-md transition">Main</Link>
            <Link to="/offense" className="hover:bg-blue-600 px-3 py-2 rounded-md transition">Offensive</Link>
            <Link to="/defense" className="hover:bg-blue-600 px-3 py-2 rounded-md transition">Defensive</Link>
            <Link to="/playdrawing" className="hover:bg-blue-600 px-3 py-2 rounded-md transition">Play Drawing</Link>
          </div>
        </nav>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<MainDashboard />} />
            <Route path="/offense" element={<OffensiveDashboard />} />
            <Route path="/defense" element={<DefensiveDashboard />} />
            <Route path="/playdrawing" element={<PlayDrawing />} />
            
            {/* 👇 Redirect all unknown routes to Main */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
