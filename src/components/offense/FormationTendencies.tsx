import React from "react";
import { PlayLogEntry } from "../../types/PlayLogEntry";

interface Props {
  playLogs: PlayLogEntry[];
}

const FormationTendencies: React.FC<Props> = ({ playLogs }) => {
  // Count run/pass by formation
  const formationStats = playLogs.reduce<Record<string, { run: number; pass: number }>>((acc, play) => {
    if (!acc[play.formation]) acc[play.formation] = { run: 0, pass: 0 };
    if (play.playType === "Run") acc[play.formation].run++;
    else if (play.playType === "Pass") acc[play.formation].pass++;
    return acc;
  }, {});

  return (
    <div>
      <h2>Formation Tendencies</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Formation</th>
            <th>Run %</th>
            <th>Pass %</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(formationStats).map(([formation, stats]) => {
            const total = stats.run + stats.pass;
            const runPct = total ? ((stats.run / total) * 100).toFixed(1) : "0";
            const passPct = total ? ((stats.pass / total) * 100).toFixed(1) : "0";
            return (
              <tr key={formation}>
                <td>{formation}</td>
                <td>{runPct}%</td>
                <td>{passPct}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FormationTendencies;
