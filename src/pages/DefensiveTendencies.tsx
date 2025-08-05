import React from "react";
import CoverageBreakdown from "../components/defense/CoverageBreakdown";
import { PressureTrends } from "../components/defense/PressureTrends";
import FrontAnalysis from "../components/defense/FrontAnalysis";

const DefensiveTendenciesPage: React.FC = () => {
  // Example data for each component; replace with real API or state
  const coverageData = [
    { coverageType: "Zone", percentage: 45, description: "Zone coverage focuses on area defense." },
    { coverageType: "Man", percentage: 35, description: "Man coverage focuses on individual matchups." },
    { coverageType: "Blitz", percentage: 20, description: "Blitz is aggressive pass rush." },
  ];

  const pressureData = [
    { week: "Week 1", blitzRate: 22, pressureRate: 30, sackRate: 8 },
    { week: "Week 2", blitzRate: 25, pressureRate: 28, sackRate: 10 },
    { week: "Week 3", blitzRate: 20, pressureRate: 26, sackRate: 7 },
    { week: "Week 4", blitzRate: 27, pressureRate: 34, sackRate: 12 },
  ];

  const frontAnalysisData = [
    { frontName: "4-3", usagePercent: 50, runStopRate: 60, passRushRate: 40, notes: "Base defense" },
    { frontName: "3-4", usagePercent: 30, runStopRate: 55, passRushRate: 45, notes: "Nickel personnel" },
    { frontName: "Nickel", usagePercent: 20, runStopRate: 50, passRushRate: 50, notes: "Pass defense focus" },
  ];

  return (
    <main style={{ maxWidth: 1000, margin: "2rem auto", fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif", padding: "0 1rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Defensive Tendencies Overview</h1>

      <section style={{ marginBottom: "3rem" }}>
        <CoverageBreakdown data={coverageData} />
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <PressureTrends data={pressureData} />
      </section>

      <section>
        <FrontAnalysis data={frontAnalysisData} />
      </section>
    </main>
  );
};

export default DefensiveTendenciesPage;
