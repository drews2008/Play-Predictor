import React from "react";
import { PlayLogEntry } from "./TendencyDashboard";

interface Props {
  playLogs: PlayLogEntry[];
}

const SituationalTendencies: React.FC<Props> = ({ playLogs }) => {
  // Group by down & distance ranges example

  const firstDownPlays = playLogs.filter((p) => p.down === 1);
  const runCount = firstDownPlays.filter((p) => p.playType === "Run").length;
  const passCount = firstDownPlays.filter((p) => p.playType === "Pass").length;
  const total = firstDownPlays.length;

  const runPct = total ? ((runCount / total) * 100).toFixed(1) : "0";
  const passPct = total ? ((passCount / total) * 100).toFixed(1) : "0";

  return (
    <div>
      <h2>Situational Tendencies</h2>
      <h3>First Down</h3>
      <p>Run: {runPct}%</p>
      <p>Pass: {passPct}%</p>
      {/* TODO: Add other downs & distances */}
    </div>
  );
};

export default SituationalTendencies;
