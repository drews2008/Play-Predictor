// src/components/defense/FrontAnalysis.tsx
import React from "react";

export interface FrontAnalysisProps {
  data: {
    frontName: string;
    usagePercent: number;      // How often this front is used
    runStopRate?: number;      // Optional metric: run stops %
    passRushRate?: number;     // Optional metric: pass rush effectiveness
    notes?: string;            // Optional additional notes
  }[];
}

const FrontAnalysis: React.FC<FrontAnalysisProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No front analysis data available.</div>;
  }

  return (
    <div className="front-analysis">
      <table
        className="front-analysis-table"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>
              Defensive Front
            </th>
            <th style={{ borderBottom: "1px solid #ccc", textAlign: "right", padding: "8px" }}>
              Usage %
            </th>
            <th style={{ borderBottom: "1px solid #ccc", textAlign: "right", padding: "8px" }}>
              Run Stop %
            </th>
            <th style={{ borderBottom: "1px solid #ccc", textAlign: "right", padding: "8px" }}>
              Pass Rush %
            </th>
            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>
              Notes
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ frontName, usagePercent, runStopRate, passRushRate, notes }, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff" }}>
              <td style={{ padding: "8px" }}>{frontName}</td>
              <td style={{ padding: "8px", textAlign: "right" }}>{usagePercent.toFixed(1)}%</td>
              <td style={{ padding: "8px", textAlign: "right" }}>
                {runStopRate !== undefined ? `${runStopRate.toFixed(1)}%` : "N/A"}
              </td>
              <td style={{ padding: "8px", textAlign: "right" }}>
                {passRushRate !== undefined ? `${passRushRate.toFixed(1)}%` : "N/A"}
              </td>
              <td style={{ padding: "8px" }}>{notes || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FrontAnalysis;
