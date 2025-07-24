import React from "react";
import { PlayLogEntry } from "./TendencyDashboard";

// Placeholder heat chart component
const HeatChart: React.FC<{ playLogs: PlayLogEntry[] }> = ({ playLogs }) => {
  return (
    <div>
      <h2>Heat Chart</h2>
      <p>Heatmap visualization goes here.</p>
    </div>
  );
};

export default HeatChart;
