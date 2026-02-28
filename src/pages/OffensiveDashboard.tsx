import React, { useState } from "react";
import OffensivePlayUploader from "../components/playlog/OffensivePlayUploader";
import OffensiveTendencies from "../components/offense/OffensiveTendencies";
import { OffensivePlayLogEntry } from "../types/OffensivePlayLogEntry";
import BackButton from "../components/ui/Button";

const OffensiveDashboard: React.FC = () => {
  const [playLog, setPlayLog] = useState<OffensivePlayLogEntry[]>([]);

  return (
    <div className="p-6">
      <div className="mb-4">
        <BackButton />
      </div>
      <h2 className="mb-4 text-2xl font-bold text-blue-700">Offensive Dashboard</h2>
      <p className="mb-2 text-blue-900/80">Upload your play log and switch between tendency tabs.</p>

      {playLog.length === 0 ? (
        <section className="mb-4 rounded-xl border border-blue-200 bg-blue-50/60 p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-blue-900">AI Insights</h3>
            <span className="rounded-full border border-blue-300 bg-white px-2 py-1 text-xs font-medium text-blue-700">
              Waiting for data
            </span>
          </div>
          <p className="text-sm text-blue-800/90">
            Upload a play log to generate AI insights for run/pass tendency, best situations, and concept usage.
          </p>
        </section>
      ) : null}

      <OffensivePlayUploader onDataLoaded={setPlayLog} />

      {playLog.length > 0 ? (
        <OffensiveTendencies playLog={playLog} />
      ) : (
        <p className="mt-4 text-gray-600">Upload a playlog to view tendencies.</p>
      )}
    </div>
  );
};

export default OffensiveDashboard;
