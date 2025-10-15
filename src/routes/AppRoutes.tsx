import React from "react";
import { Routes, Route } from "react-router-dom";
import MainDashboard from "../pages/MainDashboard";
import OffensiveDashboard from "../pages/OffensiveDashboard";
import DefensiveDashboard from "../pages/DefensiveDashboard";
import PlayDrawingPage from "../pages/PlayDrawingPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainDashboard />} />
      <Route path="/tendency" element={<OffensiveDashboard />} />
      <Route path="/defensivetendencies" element={<DefensiveDashboard />} />
      <Route path="/playdrawing" element={<PlayDrawingPage />} />
      <Route path="*" element={<div className="p-6 text-xl font-bold">Page Not Found</div>} />
    </Routes>
  );
}
