// src/pages/OffensiveDashboard.tsx
import React, { useState } from "react";
import OffensivePlayUploader from "../components/playlog/OffensivePlayUploader";
import OffensiveTendencies from "../components/offense/OffensiveTendencies";
import { OffensivePlayLogEntry } from "../types/OffensivePlayLogEntry";

const OffensiveDashboard: React.FC = () => {
  const [playLog, setPlayLog] = useState<OffensivePlayLogEntry[]>([]);

  const handleParsedData = (data: OffensivePlayLogEntry[]) => {
    setPlayLog(data);
  };

  const handleAddPlay = (play: OffensivePlayLogEntry) => {
    setPlayLog(prev => [...prev, play]);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Offensive Tendency Dashboard</h1>
      <OffensivePlayUploader onDataProcessed={handleParsedData} />
      {playLog.length > 0 && (
        <OffensiveTendencies playLog={playLog} onAddPlay={handleAddPlay} />
      )}
 

    </div>
  );
};

export default OffensiveDashboard;
