import React from "react";
import { getSituationalTendencies } from "../../engine/tendencyEngine";
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

  const formatCell = (g: { run: number; pass: number; total: number }) => {
    if (!g || g.total === 0) return "-";
    const runPct = ((g.run / g.total) * 100).toFixed(0);
    const passPct = ((g.pass / g.total) * 100).toFixed(0);
    return `${runPct}% / ${passPct}%`;
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 text-blue-700">
        Situational Tendencies (By Hash)
      </h3>

      <table className="min-w-full border text-sm">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border px-2 py-1 text-left">Situation</th>
            <th className="border px-2 py-1 text-center">Left</th>
            <th className="border px-2 py-1 text-center">Middle</th>
            <th className="border px-2 py-1 text-center">Right</th>
          </tr>
        </thead>

        <tbody>
          {order
            .filter((s) => grouped[s])
            .map((s) => {
              const row = grouped[s];

              return (
                <tr key={s} className="even:bg-blue-50">
                  <td className="border px-2 py-1 font-medium">{s}</td>

                  <td className="border px-2 py-1 text-center">
                    {formatCell(row.Left)}
                  </td>

                  <td className="border px-2 py-1 text-center">
                    {formatCell(row.Middle)}
                  </td>

                  <td className="border px-2 py-1 text-center">
                    {formatCell(row.Right)}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default SituationalTendencies;