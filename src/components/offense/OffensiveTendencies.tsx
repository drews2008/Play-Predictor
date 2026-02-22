import React from "react";
import {
  getOverallTendencies,
  getFormationTendencies,
  getSituationalTendencies,
} from "../../engine/tendencyEngine";
import { OffensivePlayLogEntry } from "../../types/OffensivePlayLogEntry";
import  SituationalTendencies  from "./SituationalTendencies";
interface Props {
  playLog: OffensivePlayLogEntry[];
}
const OffensiveTendencies: React.FC<Props> = ({ playLog }) => {
  const overall = getOverallTendencies(playLog);
  const formations = getFormationTendencies(playLog);
  const grouped = getSituationalTendencies(playLog);
  console.log(grouped);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">
        Overall Play Type Tendencies
      </h3>

      <p>Run: {Number(overall.runPct).toFixed(1)}% ({overall.run})</p>
      <p>Pass: {Number(overall.passPct).toFixed(1)}% ({overall.pass})</p>

      <h3 className="text-xl font-semibold mt-4 mb-2">
        Plays by Formation
      </h3>

      <table className="border-collapse border w-full">
        <thead>
          <tr>
            <th className="border p-2">Formation</th>
            <th className="border p-2">Run</th>
            <th className="border p-2">Pass</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(formations).map(([formation, data]) => (
            <tr key={formation}>
              <td className="border p-2">{formation}</td>
              <td className="border p-2">{data.run}</td>
              <td className="border p-2">{data.pass}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OffensiveTendencies;