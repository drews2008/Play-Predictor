// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Core pages
import Home from "../pages/Home";
import MainDashboard from "../pages/MainDashboard";
import OffensiveDashboard from "../pages/OffensiveDashboard";
import DefensiveDashboard from "../pages/DefensiveDashboard";
import PlayDrawingPage from "../pages/PlayDrawingPage";
import PracticePlanner from "../pages/PracticePlanner";
import NotFound from "../pages/NotFound";

// Components
import DefensivePlayUploader from "../components/playlog/DefensivePlayUploader";
import DefensiveTendencies from "../components/defense/DefensiveTendencies";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Dashboards */}
      <Route path="/dashboard" element={<MainDashboard />} />
      <Route path="/offense" element={<OffensiveDashboard />} />
      <Route path="/defense" element={<DefensiveDashboard />} />

      {/* Defense Modules */}
      <Route path="/defense/uploader" element={<DefensivePlayUploader />} />
      <Route path="/defense/tendencies" element={<DefensiveTendencies playLog={[]} />} />

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
