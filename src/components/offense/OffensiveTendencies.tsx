import { useMemo, useState } from "react";
import { OffensivePlayLogEntry } from "../../types/OffensivePlayLogEntry";
import { buildOffensiveDashboard } from "../../engine/tendencyEngine";

import FormationTendencies from "./FormationTendencies";
import SituationalTendencies from "./SituationalTendencies";
import ConceptBreakdown from "./ConceptBreakdown";

type Props = {
  playLog: OffensivePlayLogEntry[];
};

type TabId = "formations" | "situations" | "concepts";

const TABS: { id: TabId; label: string }[] = [
  { id: "formations", label: "Formations" },
  { id: "situations", label: "Situations" },
  { id: "concepts", label: "Concepts" },
];

export default function OffensiveDashboard({ playLog }: Props) {
  const data = buildOffensiveDashboard(playLog);
  const [activeTab, setActiveTab] = useState<TabId>("formations");

  const tabContent = useMemo(() => {
    if (activeTab === "situations") {
      return <SituationalTendencies data={data.situations} />;
    }

    if (activeTab === "concepts") {
      return <ConceptBreakdown data={data.concepts} />;
    }

    return <FormationTendencies data={data.formations} />;
  }, [activeTab, data.concepts, data.formations, data.situations]);

  if (!playLog || playLog.length === 0) {
    return <div>No Data</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-blue-900">Offensive Tendency Dashboard</h2>

      <div className="border-b border-blue-200">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Offensive dashboard tabs">
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`offense-tab-${tab.id}`}
                id={`offense-tab-button-${tab.id}`}
                className={`px-4 py-2 text-sm font-medium rounded-t-md border transition ${
                  isActive
                    ? "bg-blue-700 text-white border-blue-700"
                    : "bg-white text-blue-800 border-blue-200 hover:bg-blue-50"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <section
        role="tabpanel"
        id={`offense-tab-${activeTab}`}
        aria-labelledby={`offense-tab-button-${activeTab}`}
        className="bg-white rounded-lg border border-blue-100 shadow-sm p-4"
      >
        {tabContent}
      </section>
    </div>
  );
}
