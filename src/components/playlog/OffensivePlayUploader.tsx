import React from "react";
import { parseOffensiveCSV } from "../../services/fileParser";
import { OffensivePlayLogEntry } from "../../types/OffensivePlayLogEntry";

interface Props {
  onDataLoaded: (data: OffensivePlayLogEntry[]) => void;
}

const OffensivePlayUploader: React.FC<Props> = ({ onDataLoaded }) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === "string") {
        const parsed = parseOffensiveCSV(text);
        // Convert down to the correct Down type
        const converted = parsed.map((entry: any) => ({
          ...entry,
          down: entry.down as OffensivePlayLogEntry["down"],
        }));
        onDataLoaded(converted);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="border rounded p-2"
      />
    </div>
  );
};

export default OffensivePlayUploader;
