import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TendencyDashboard from "./pages/TendencyDashboard";
import PlayDrawing from "./pages/PlayDrawing";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tendency" element={<TendencyDashboard />} />
      <Route path="/playdrawing" element={<PlayDrawing />} />
    </Routes>
  );
}