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

        // Ensure correct typing
        const cleaned: OffensivePlayLogEntry[] = parsed.map((entry: any) => ({
          ...entry,
          down: Number(entry.down) as OffensivePlayLogEntry["down"],
          distance: Number(entry.distance),
          yardageGained: Number(entry.yardageGained),
        }));

        onDataLoaded(cleaned);
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