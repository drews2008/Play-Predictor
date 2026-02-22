import React from "react";
import { OffensivePlayLogEntry } from "../../types/OffensivePlayLogEntry";

interface Props {
  playLog: OffensivePlayLogEntry[];
}

const FormationTendencies: React.FC<Props> = ({ playLog }) => {
  const grouped: Record<string, { run: number; pass: number; total: number }> = {};

  playLog.forEach((play) => {
    const formation = play.formation || "Unknown";
    if (!grouped[formation]) grouped[formation] = { run: 0, pass: 0, total: 0 };
    grouped[formation].total++;
    if (play.playType?.toLowerCase().includes("run")) grouped[formation].run++;
    else grouped[formation].pass++;
  });

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-blue-700">Formation Tendencies</h3>
      <table className="min-w-full border text-sm">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border px-2 py-1 text-left">Formation</th>
            <th className="border px-2 py-1 text-left">Run %</th>
            <th className="border px-2 py-1 text-left">Pass %</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(grouped).map(([formation, stats], i) => {
            const runPct = ((stats.run / stats.total) * 100).toFixed(0);
            const passPct = ((stats.pass / stats.total) * 100).toFixed(0);
            return (
              <tr key={i} className="even:bg-blue-50">
                <td className="border px-2 py-1">{formation}</td>
                <td className="border px-2 py-1">{runPct}%</td>
                <td className="border px-2 py-1">{passPct}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FormationTendencies;
