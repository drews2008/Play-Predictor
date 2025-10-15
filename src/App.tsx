import React from "react";
import OffensivePlayUploader from "./components/playlog/OffensivePlayUploader";
import { OffensivePlayLogEntry } from "./types/OffensivePlayLogEntry";

export const App: React.FC = () => {
  const handleParsedData = (data: OffensivePlayLogEntry[]) => {
    console.log("Parsed Play Log:", data);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Play Log Upload Test</h1>
      <OffensivePlayUploader onDataProcessed={handleParsedData} />
    </div>
  );
};
