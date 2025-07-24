import React from "react";
import { PlayLogEntry } from "./TendencyDashboard";

interface Props {
  playLogs: PlayLogEntry[];
}

const FormationTendencies: React.FC<Props> = ({ playLogs }) => {
  // Count run vs pass by formation (simplified example)
  // For now, just aggregate overall run/pass tendencies
  
  const runCount = playLogs.filter((p) => p.playType === "Run").length;
  const passCount = playLogs.filter((p) => p.playType === "Pass").length;
  const total = playLogs.length;

  const runPct = total ? ((runCount / total) * 100).toFixed(1) : "0";
  const passPct = total ? ((passCount / total) * 100).toFixed(1) : "0";

  return (
    <div>
      <h2>Formation Tendencies (Overall)</h2>
      <p>Run: {runPct}%</p>
      <p>Pass: {passPct}%</p>
      {/* TODO: Add formation-specific breakdown */}
    </div>
  );
};

export default FormationTendencies;
