import React from "react";
import OffensivePlaylogEntry from "../types/OffensivePlayLogEntry";

interface FormationTendenciesProps {
  plays: OffensivePlaylogEntry[];
}

interface FormationStats {
  runCount: number;
  passCount: number;
  total: number;
}

const FormationTendencies: React.FC<FormationTendenciesProps> = ({ plays }) => {
  const formationMap: Record<string, FormationStats> = {};

  plays.forEach((play) => {
    const formation = play.formation || "Unknown";

    if (!formationMap[formation]) {
      formationMap[formation] = { runCount: 0, passCount: 0, total: 0 };
    }

    formationMap[formation].total += 1;
    if (play.playType === "Run") formationMap[formation].runCount += 1;
    else if (play.playType === "Pass") formationMap[formation].passCount += 1;
  });

  const formations = Object.entries(formationMap);

  return (
    <div>
      <h2>Formation Tendencies</h2>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-1">Formation</th>
            <th className="border border-gray-300 px-2 py-1">Run %</th>
            <th className="border border-gray-300 px-2 py-1">Pass %</th>
            <th className="border border-gray-300 px-2 py-1">Total Plays</th>
          </tr>
        </thead>
        <tbody>
          {formations.map(([formation, stats]) => {
            const runPct = ((stats.runCount / stats.total) * 100).toFixed(1);
            const passPct = ((stats.passCount / stats.total) * 100).toFixed(1);

            return (
              <tr key={formation}>
                <td className="border border-gray-300 px-2 py-1">{formation}</td>
                <td className="border border-gray-300 px-2 py-1">{runPct}%</td>
                <td className="border border-gray-300 px-2 py-1">{passPct}%</td>
                <td className="border border-gray-300 px-2 py-1">{stats.total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FormationTendencies;
