import React, { useState } from "react";
import OffensivePlayUploader from "../components/playlog/OffensivePlayUploader";
import OffensiveTendencies from "../components/offense/OffensiveTendencies";
import { OffensivePlayLogEntry } from "../types/OffensivePlayLogEntry";

const OffensiveDashboard: React.FC = () => {
  const [playLog, setPlayLog] = useState<OffensivePlayLogEntry[]>([]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Offensive Tendency Dashboard
      </h2>

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