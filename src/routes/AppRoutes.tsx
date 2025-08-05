import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home";
import OffensiveTendencies from "../pages/OffensiveTendencies";
import PlayDrawingPage from "../pages/PlayDrawingPage";
import DefensiveTendenciesPage from "../pages/DefensiveTendencies";
// Update the import path if the file is named differently, e.g. TendencyDashboardPage.tsx
import TendencyDashboard from "../pages/OffensiveTendencies";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tendency" element={<TendencyDashboard />} />
      <Route path="/playdrawing" element={<PlayDrawingPage />} />
      <Route path="/defensivetendencies" element={<DefensiveTendenciesPage />} />
      {/* Optional catch-all */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}
