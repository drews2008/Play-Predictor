// src/pages/DefensiveDashboard.tsx
import React from "react";
import DefensiveTendenciesPage from "../components/defense/DefensiveTendencies";

const DefensiveDashboard: React.FC = () => {
  return (
    <main style={{ maxWidth: 1000, margin: "2rem auto", padding: "0 1rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Defensive Dashboard</h1>
      <DefensiveTendenciesPage />
    </main>
  );
};

export default DefensiveDashboard;
