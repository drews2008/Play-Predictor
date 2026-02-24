import React, { useState } from "react";
import FormationBreakdown from "./FormationTendencies";
import SituationalBreakdown from "./SituationalTendencies";
import ConceptBreakdown from "./ConceptBreakdown";
import { OffensivePlayLogEntry } from "../../types/OffensivePlayLogEntry";

interface Props {
  playLog: OffensivePlayLogEntry[];
}

type Tab = "formations" | "situations" | "concepts";

const OffensiveDashboard: React.FC<Props> = ({ playLog }) => {
  const [activeTab, setActiveTab] = useState<Tab>("formations");

  return (
    <div className="space-y-4">
      
      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("formations")}
          className={`px-4 py-2 font-medium ${
            activeTab === "formations"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Formations
        </button>

        <button
          onClick={() => setActiveTab("situations")}
          className={`px-4 py-2 font-medium ${
            activeTab === "situations"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Situations
        </button>

        <button
          onClick={() => setActiveTab("concepts")}
          className={`px-4 py-2 font-medium ${
            activeTab === "concepts"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Concepts
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === "formations" && (
          <FormationBreakdown playLog={playLog} />
        )}

        {activeTab === "situations" && (
          <SituationalBreakdown playLog={playLog} />
        )}

        {activeTab === "concepts" && (
          <ConceptBreakdown playLog={playLog} />
        )}
      </div>
    </div>
  );
};

export default OffensiveDashboard;