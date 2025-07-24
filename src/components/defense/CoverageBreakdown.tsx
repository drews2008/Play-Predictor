import React from "react";

interface CoverageData {
  coverageType: string;
  percentage: number;
  description?: string;
}

interface Props {
  data: CoverageData[];
}

const CoverageBreakdown: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No coverage data available.</div>;
  }

  return (
    <div className="coverage-breakdown-container">
      <h3>Defensive Coverage Breakdown</h3>
      <table className="coverage-table" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "8px" }}>Coverage Type</th>
            <th style={{ textAlign: "right", padding: "8px" }}>Percentage</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ coverageType, percentage, description }) => (
            <tr key={coverageType} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={{ padding: "8px" }}>{coverageType}</td>
              <td style={{ padding: "8px", textAlign: "right" }}>
                {percentage.toFixed(1)}%
              </td>
              <td style={{ padding: "8px" }}>{description || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoverageBreakdown;
