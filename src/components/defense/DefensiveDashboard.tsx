import React, { useEffect, useState } from "react";
import CoverageBreakdown from "./CoverageBreakdown";
import PressureTrends from "./PressureTrends";
import FrontAnalysis from "./FrontAnalysis";

interface Coverage {
  coverageType: string;
  percentage: number;
  description?: string;
}

interface FrontData {
  frontName: string;
  usagePercent: number;
  runStopRate: number;
  passRushRate: number;
  notes?: string;
}

interface DefensiveData {
  coverage: Coverage[];
  pressureTrends: any; // TODO: replace 'any' with actual type
  frontAnalysis: FrontData[];
}

// Dummy function to simulate data fetching - replace with your actual fetch logic
async function fetchDefensiveData(): Promise<DefensiveData> {
  return {
    coverage: [
      { coverageType: "Zone", percentage: 55, description: "Mostly Cover 3" },
      { coverageType: "Man", percentage: 45, description: "Cover 1 mostly" },
    ],
    pressureTrends: {}, // replace with actual data
    frontAnalysis: [
      { frontName: "4-3", usagePercent: 45.2, runStopRate: 38.5, passRushRate: 27.4, notes: "Standard base front" },
      { frontName: "3-4", usagePercent: 30.1, runStopRate: 42.3, passRushRate: 33.7 },
      { frontName: "Nickel", usagePercent: 24.7, runStopRate: 28.5, passRushRate: 22.1, notes: "Nickel dime packages" },
    ],
  };
}

const DefensiveDashboard: React.FC = () => {
  const [defensiveData, setDefensiveData] = useState<DefensiveData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDefensiveData() {
      try {
        const data = await fetchDefensiveData();
        setDefensiveData(data);
      } catch {
        setError("Failed to load defensive data.");
      } finally {
        setLoading(false);
      }
    }
    loadDefensiveData();
  }, []);

  if (loading) return <div>Loading defensive data...</div>;
  if (error) return <div>{error}</div>;
  if (!defensiveData) return <div>No defensive data available.</div>;

  return (
    <div className="defensive-dashboard">
      <h2>Defensive Dashboard</h2>

      <section className="coverage-section">
        <h3>Coverage Breakdown</h3>
        <CoverageBreakdown data={defensiveData.coverage} />
      </section>

      <section className="pressure-trends-section">
        <h3>Pressure Trends</h3>
        <PressureTrends data={defensiveData.pressureTrends} />
      </section>

      <section className="front-analysis-section">
        <h3>Front Analysis</h3>
        <FrontAnalysis data={defensiveData.frontAnalysis} />
      </section>
    </div>
  );
};

export default DefensiveDashboard;
