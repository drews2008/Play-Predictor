import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";
import MainDashboard from "./pages/MainDashboard";
import OffensiveDashboard from "./pages/OffensiveDashboard";
import DefensiveDashboard from "./pages/DefensiveDashboard";
import PlayDrawing from "./pages/PlayDrawingPage";

const AppShell: React.FC = () => {
  const location = useLocation();
  const showBackToMain = location.pathname !== "/";

  return (
    <div className="min-h-screen bg-blue-50/80 text-blue-950">
      <nav className="sticky top-0 z-10 border-b border-blue-200/70 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white shadow-lg backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold tracking-tight">PlayPredictor Dashboard</h1>
          <div className="flex flex-wrap gap-2">
            <Link to="/" className="rounded-full px-3 py-2 text-sm transition hover:bg-white/20">Main</Link>
            <Link to="/offense" className="rounded-full px-3 py-2 text-sm transition hover:bg-white/20">Offensive</Link>
            <Link to="/defense" className="rounded-full px-3 py-2 text-sm transition hover:bg-white/20">Defensive</Link>
            <Link to="/playdrawing" className="rounded-full px-3 py-2 text-sm transition hover:bg-white/20">Play Drawing</Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-6xl p-6">
        {showBackToMain ? (
          <div className="mb-4">
            <Link
              to="/"
              className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-800 shadow-sm transition hover:bg-blue-50"
            >
              ← Back to Main Dashboard
            </Link>
          </div>
        ) : null}

        <div className="rounded-2xl border border-blue-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm md:p-6">
          <Routes>
            <Route path="/" element={<MainDashboard />} />
            <Route path="/offense" element={<OffensiveDashboard />} />
            <Route path="/defense" element={<DefensiveDashboard />} />
            <Route path="/playdrawing" element={<PlayDrawing />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppShell />
    </Router>
  );
};

export default App;
