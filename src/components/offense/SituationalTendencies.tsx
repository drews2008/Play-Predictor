
import React from "react";

import { getSituationalTendencies } from "../../engine/tendencyEngine";// Define the Props interface
import { OffensivePlayLogEntry } from "../../types/OffensivePlayLogEntry";

interface Props {
  playLog: OffensivePlayLogEntry[];
}

const SituationalTendencies: React.FC<Props> = ({ playLog }) => {
  const grouped = getSituationalTendencies(playLog);

  const order = [
    "1st & 10",
    "2nd & 1–3",
    "2nd & 4–7",
    "2nd & 8+",
    "3rd & 1–3",
    "3rd & 4–7",
    "3rd & 8+",
    "4th Down",
    "Other",
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-blue-700">
        Situational Tendencies
      </h3>

      <table className="min-w-full border text-sm">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border px-2 py-1 text-left">Situation</th>
            <th className="border px-2 py-1 text-left">Run %</th>
            <th className="border px-2 py-1 text-left">Pass %</th>
          </tr>
        </thead>

        <tbody>
          {order
            .filter((s) => grouped[s])
            .map((s) => {
              const g = grouped[s];
              const runPct = ((g.run / g.total) * 100).toFixed(0);
              const passPct = ((g.pass / g.total) * 100).toFixed(0);

              return (
                <tr key={s} className="even:bg-blue-50">
                  <td className="border px-2 py-1">{s}</td>
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
export default SituationalTendencies;