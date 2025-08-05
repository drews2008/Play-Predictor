// src/App.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import OffensivePlayUploader from "./components/playlog/OffensivePlayUploader";
import { OffensivePlayLogEntry } from "./types/OffensivePlayLogEntry";

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleParsedData = (data: OffensivePlayLogEntry[]) => {
    console.log("Parsed Play Log:", data);
    navigate("/dashboard", { state: { data } });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Play Log</h1>
      <OffensivePlayUploader onDataProcessed={handleParsedData} />
    </div>
  );
}
