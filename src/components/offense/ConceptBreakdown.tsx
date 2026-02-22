import React from "react";
import { getConceptTendencies } from "../../engine/tendencyEngine";
import { OffensivePlayLogEntry } from "../../types/OffensivePlayLogEntry";

interface Props {
  playLog: OffensivePlayLogEntry[];
}

const ConceptBreakdown: React.FC<Props> = ({ playLog }) => {
  const concepts = getConceptTendencies(playLog);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-3 text-blue-700">
        Concept Breakdown (Run vs Pass Usage)
      </h3>

      <table className="min-w-full border text-sm shadow-sm">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border px-3 py-2 text-left">Concept</th>
            <th className="border px-3 py-2 text-green-200">Run</th>
            <th className="border px-3 py-2 text-red-200">Pass</th>
            <th className="border px-3 py-2">Total</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(concepts).map(([concept, data]) => {
            const isRunHeavy = data.run > data.pass;
            const isPassHeavy = data.pass > data.run;

            return (
              <tr
                key={concept}
                className={`even:bg-blue-50 ${
                  isRunHeavy
                    ? "bg-green-50"
                    : isPassHeavy
                    ? "bg-red-50"
                    : ""
                }`}
              >
                <td className="border px-3 py-2 font-medium">{concept}</td>

                <td className="border px-3 py-2 text-green-600 font-semibold">
                  {data.run}
                </td>

                <td className="border px-3 py-2 text-red-600 font-semibold">
                  {data.pass}
                </td>

                <td className="border px-3 py-2 font-bold text-gray-800">
                  {data.total}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ConceptBreakdown;