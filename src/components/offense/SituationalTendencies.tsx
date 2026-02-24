// components/offense/SituationalTendencies.tsx

import React from "react";
import { buildSituations } from "../../engine/tendencyEngine";
import { OffensivePlayLogEntry } from "../../types/OffensivePlayLogEntry";

interface Props {
  playLog: OffensivePlayLogEntry[];
}

// 🔥 Define display order (NOT random object order)
const ORDER = [
  "1st & 10",

  "2nd & 1-3",
  "2nd & 4-7",
  "2nd & 8+",

  "3rd & 1-3",
  "3rd & 4-7",
  "3rd & 8+",

  "4th & 1-3",
  "4th & 4-7",
  "4th & 8+",

  "2PT", // ✅ Added
];

const groupByDown = (data: Record<string, any>) => {
  const grouped: Record<string, [string, any][]> = {
    "1st Down": [],
    "2nd Down": [],
    "3rd Down": [],
    "4th Down": [],
    "2PT": [],
  };

  ORDER.forEach((key) => {
    if (!data[key]) return;

    if (key.startsWith("1st")) grouped["1st Down"].push([key, data[key]]);
    else if (key.startsWith("2nd")) grouped["2nd Down"].push([key, data[key]]);
    else if (key.startsWith("3rd")) grouped["3rd Down"].push([key, data[key]]);
    else if (key.startsWith("4th")) grouped["4th Down"].push([key, data[key]]);
    else if (key === "2PT") grouped["2PT"].push([key, data[key]]);
  });

  return grouped;
};

const SituationalTendencies: React.FC<Props> = ({ playLog }) => {
  const data = buildSituations(playLog);
  const grouped = groupByDown(data);

  return (
    <div className="p-6 border rounded-xl bg-white shadow">
      <h3 className="text-xl font-bold mb-4">Situational Tendencies</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Situation</th>
            <th className="p-2">Run %</th>
            <th className="p-2">Pass %</th>
            <th className="p-2">Avg Yds</th>
          </tr>
        </thead>

        <tbody>
          {Object.values(grouped).every((g) => g.length === 0) ? (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                No data
              </td>
            </tr>
          ) : (
            Object.entries(grouped).map(([down, situations]) => (
              <React.Fragment key={down}>
                
                {/* 🔥 Section Header */}
                {situations.length > 0 && (
                  <tr className="bg-gray-100">
                    <td colSpan={4} className="p-2 font-bold text-left">
                      {down}
                    </td>
                  </tr>
                )}

                {/* Rows */}
                {situations.map(([key, s]) => (
                  <tr key={key} className="border-t">
                    <td className="p-2 pl-6 font-medium">{key}</td>
                    <td className="p-2 text-center">
                      {Number(s.runPct ?? 0).toFixed(0)}%
                    </td>
                    <td className="p-2 text-center">
                      {Number(s.passPct ?? 0).toFixed(0)}%
                    </td>
                    <td className="p-2 text-center">
                      {Number(s.avgYards ?? 0).toFixed(1)}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SituationalTendencies;