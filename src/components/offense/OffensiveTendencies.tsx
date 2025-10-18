import React, { useState } from "react";
import FormationTendencies from "./FormationTendencies";
import SituationalTendencies from "./SituationalTendencies";
import PlayTable from "./PlayTable";
import HeatChart from "./HeatChart";
import AddPlay from "./AddPlay";
import { OffensivePlayLogEntry } from "../../types/OffensivePlayLogEntry";

interface OffensiveTendenciesProps {
  playLog: OffensivePlayLogEntry[];
  onAddPlay?: (play: OffensivePlayLogEntry) => void;
}

const tabs = [
  { label: "Formation", component: FormationTendencies },
  { label: "Situational", component: SituationalTendencies },
  { label: "Play Breakdown", component: PlayTable },
  { label: "Heat Map", component: HeatChart },
];

const OffensiveTendencies: React.FC<OffensiveTendenciesProps> = ({ playLog, onAddPlay }) => {
  const [activeTab, setActiveTab] = useState(0);

  const ActiveComponent = tabs[activeTab].component;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Offensive Tendencies</h2>

      {onAddPlay && <AddPlay onAdd={onAddPlay} />}

      {/* Tabs */}
      <div className="flex border-b-2 border-blue-300 mb-4">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 font-semibold rounded-t-lg transition-colors duration-200 ${
              idx === activeTab
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-700 hover:bg-blue-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 border border-t-0 border-blue-300 rounded-b-lg bg-blue-50">
        <ActiveComponent playLog={playLog} />
      </div>
    </div>
  );
};

export default OffensiveTendencies;
