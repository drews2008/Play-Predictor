// src/components/defense/PressureTrends.tsx
import React from "react";

export interface PressureTrend {
  situation: string;     // e.g., "1st down", "3rd & long"
  pressureRate: number;  // percentage or rate of pressure
  successRate?: number;  // optional, e.g., sacks or QB hurry rate
  notes?: string;
}

export interface PressureTrendsProps {
  data: PressureTrend[];
}

const PressureTrends: React.FC<PressureTrendsProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No pressure trends data available.</div>;
  }

  return (
    <div className="pressure-trends">
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Situation</th>
            <th style={{ borderBottom: "1px solid #ccc", textAlign: "right", padding: "8px" }}>Pressure Rate %</th>
            <th style={{ borderBottom: "1px solid #ccc", textAlign: "right", padding: "8px" }}>Success Rate %</th>
            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ situation, pressureRate, successRate, notes }, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#f9f9f9" : "#fff" }}>
              <td style={{ padding: "8px" }}>{situation}</td>
              <td style={{ padding: "8px", textAlign: "right" }}>{pressureRate.toFixed(1)}%</td>
              <td style={{ padding: "8px", textAlign: "right" }}>
                {successRate !== undefined ? `${successRate.toFixed(1)}%` : "N/A"}
              </td>
              <td style={{ padding: "8px" }}>{notes || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PressureTrends;
