import React from "react";
import { OffensivePlayLogEntry } from "../../types/OffensivePlayLogEntry";
import { buildConcepts } from "../../engine/tendencyEngine";

interface Props {
  playLog: OffensivePlayLogEntry[];
}

const ConceptBreakdown: React.FC<Props> = ({ playLog }) => {
  const concepts = buildConcepts(playLog);

  return (
    <div className="mt-6 p-6 rounded-xl border border-gray-300 bg-white shadow-md">
      <h3 className="text-xl font-bold mb-4">Concept Breakdown</h3>
      <table className="w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
  <thead>
  <tr className="bg-blue-700 text-white">
    <th className="px-4 py-3 text-left">Concept</th>
    <th className="px-4 py-3 text-center">Total</th>
    <th className="px-4 py-3 text-center">Avg Yards</th>
    <th className="px-4 py-3 text-left">Top Situations</th>
  </tr>
</thead>
        <tbody>
  {Object.entries(concepts).map(([concept, data]: any, idx) => (
    <tr key={concept} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
      <td className="px-4 py-3 font-semibold">{concept}</td>

      <td className="px-4 py-3 text-center">
        {data.total}
      </td>

      <td className="px-4 py-3 text-center">
        {data.avgYards}
      </td>

      <td className="px-4 py-3">
        {data.topSituations?.map(([sit, count]: any) => (
          <div key={sit}>
            {sit} ({count})
          </div>
        ))}
      </td>
    </tr>
  ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConceptBreakdown;