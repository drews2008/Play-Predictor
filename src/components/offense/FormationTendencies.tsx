// components/offense/FormationTendencies.tsx

import React from "react";
import { buildFormations } from "../../engine/tendencyEngine";
import { OffensivePlayLogEntry } from "../../types/OffensivePlayLogEntry";

interface Props {
  playLog: OffensivePlayLogEntry[];
}

const FormationTendencies: React.FC<Props> = ({ playLog }) => {
  const data = buildFormations(playLog);

  return (
    <div className="p-6 border rounded-xl bg-white shadow">
      <h3 className="text-xl font-bold mb-4">Formation Tendencies</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Formation</th>
            <th className="p-2">Run %</th>
            <th className="p-2">Pass %</th>
            <th className="p-2">Avg Yds</th>
            <th className="p-2">Top Plays</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(data).map(([key, f]: any) => (
            <tr key={key} className="border-t">
              <td className="p-2 font-semibold">{key}</td>
              <td className="p-2 text-center">
                {Number(f.runPct ?? 0).toFixed(0)}%
              </td>
              <td className="p-2 text-center">
                {Number(f.passPct ?? 0).toFixed(0)}%
              </td>
              <td className="p-2 text-center">
                {Number(f.avgYards ?? 0).toFixed(1)}
              </td>
              <td className="p-2 text-center">
                {f.topPlays
                  ?.map((p: any) => `${p[0]} (${p[1]})`)
                  .join(", ") || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormationTendencies;