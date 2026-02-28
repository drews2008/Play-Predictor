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
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Offensive Dashboard</h2>
      <p className="text-blue-900/80 mb-2">Upload your play log and switch between tendency tabs.</p>
      <p className="mb-4 text-sm text-blue-800/80">AI Insights are auto-generated from your uploaded data and refresh instantly.</p>

      <OffensivePlayUploader onDataLoaded={setPlayLog} />

      {playLog.length > 0 ? (
        <>
          <OffensiveTendencies playLog={playLog} />
        </>
      ) : (
        <p className="mt-4 text-gray-600">
          Upload a playlog to view tendencies.
        </p>
      )}
    </div>
  );
};

export default OffensiveDashboard;