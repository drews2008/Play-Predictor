// src/components/defense/CoverageTable.tsx
import React from "react";

interface Props {
  hash: string;
  data: Record<string, Record<string, number>>;
  totals: Record<string, number>;
}

const situationOrder = [
  "First Play",
  "1st & 10",
  "2nd & 1–3",
  "2nd & 4–7",
  "2nd & 8+",
  "3rd & 1–3",
  "3rd & 4–7",
  "3rd & 8+",
  "4th & Short",
  "4th & Medium",
  "4th & Long",
  "Other",
];

const CoverageTable: React.FC<Props> = ({ hash, data, totals }) => {
  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-2 text-center">{hash} Hash – Coverage</h4>
      <table className="min-w-full border text-sm">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border px-2 py-1 text-left">Situation</th>
            <th className="border px-2 py-1 text-left">Top Coverage</th>
          </tr>
        </thead>
        <tbody>
          {situationOrder
            .filter((s) => data[s])
            .map((situation, i) => {
              const stats = data[situation];
              const total = totals[situation];
              const sorted = Object.entries(stats)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([name, count]) => `${name} (${((count / total) * 100).toFixed(0)}%)`)
                .join(", ");
              return (
                <tr key={i} className="even:bg-blue-50">
                  <td className="border px-2 py-1">{situation}</td>
                  <td className="border px-2 py-1">{sorted}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default CoverageTable;
