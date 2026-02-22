import React, { useState } from "react";
import {
  getOverallTendencies,
  getFormationTendencies,
} from "../../engine/tendencyEngine";
import { OffensivePlayLogEntry } from "../../types/OffensivePlayLogEntry";

import SituationalTendencies from "./SituationalTendencies";
import ConceptTendencies from "./ConceptBreakdown";

interface Props {
  playLog: OffensivePlayLogEntry[];
}

const OffensiveTendencies: React.FC<Props> = ({ playLog }) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "formation" | "situational" | "concept"
  >("overview");

  const overall = getOverallTendencies(playLog);
  const formations = getFormationTendencies(playLog);

  return (
    <div>
      {/* TAB HEADER */}
      <div className="flex gap-2 mb-4">
        {["overview", "formation", "situational", "concept"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-3 py-1 rounded ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {activeTab === "overview" && (
        <div>
          <h3 className="text-xl font-semibold mb-2">
            Overall Play Type
          </h3>

          <p>Run: {overall.runPct.toFixed(1)}% ({overall.run})</p>
          <p>Pass: {overall.passPct.toFixed(1)}% ({overall.pass})</p>
        </div>
      )}

      {/* FORMATION */}
      {activeTab === "formation" && (
        <div>
          <h3 className="text-xl font-semibold mb-2">
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
      )}

      {/* SITUATIONAL */}
      {activeTab === "situational" && (
        <SituationalTendencies playLog={playLog} />
      )}

      {/* CONCEPT */}
      {activeTab === "concept" && (
        <ConceptTendencies playLog={playLog} />
      )}
    </div>
  );
};

export default OffensiveTendencies;