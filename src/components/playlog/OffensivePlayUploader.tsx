// src/components/playlog/OffensivePlayUploader.tsx
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { OffensivePlayLogEntry, Down, Hash, PlayType } from "../../types/OffensivePlayLogEntry";

interface OffensivePlayUploaderProps {
  onDataProcessed: (data: OffensivePlayLogEntry[]) => void;
}

const OffensivePlayUploader: React.FC<OffensivePlayUploaderProps> = ({ onDataProcessed }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const normalizeHeaders = (headers: string[]): string[] =>
    headers.map(h =>
      h.trim().toLowerCase().replace(/\s+/g, "_").replace(/[^\w_]/g, "")
    );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (evt) => {
      const fileExt = file.name.split(".").pop()?.toLowerCase();
      let rawData: Record<string, any>[] = [];

      if (!evt.target?.result) return;

      // Excel files (.xls, .xlsx)
      if (fileExt === "xls" || fileExt === "xlsx") {
        const workbook = XLSX.read(evt.target.result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        rawData = XLSX.utils.sheet_to_json<Record<string, any>>(sheet);
      }

      // CSV files
      else if (fileExt === "csv") {
        const textData = evt.target.result as string;
        const workbook = XLSX.read(textData, { type: "string" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        rawData = XLSX.utils.sheet_to_json<Record<string, any>>(sheet);
      }

      if (rawData.length === 0) return;

      const headers = Object.keys(rawData[0]);
      const normalizedHeaders = normalizeHeaders(headers);

      const parsedData: OffensivePlayLogEntry[] = rawData.map(row => {
        const newRow: Record<string, any> = {};
        headers.forEach((key, i) => {
          newRow[normalizedHeaders[i]] = row[key];
        });

        const downNum = parseInt(newRow.down) as Down;
        const distanceNum = parseInt(newRow.distance);
        const fieldPosNum = newRow.field_position ? parseInt(newRow.field_position) : undefined;
        const driveNum = newRow.drive_number ? parseInt(newRow.drive_number) : undefined;
        const yardageNum = newRow.yardage_gained ? parseInt(newRow.yardage_gained) : undefined;
        const type: PlayType = newRow.type?.toLowerCase() === "pass" ? "Pass" : "Run";
        const ballPlacement: Hash = ["Left", "Middle", "Right"].includes(newRow.ball_placement)
          ? newRow.ball_placement
          : "Middle";

        return {
          down: downNum,
          distance: distanceNum,
          tapeCue: newRow.tape_cue || "",
          fieldPosition: fieldPosNum,
          ballPlacement,
          driveStarter: newRow.drive_starter === "Yes",
          driveNumber: driveNum,
          play: newRow.play || "",
          formation: newRow.formation || "",
          playName: newRow.play_name || "",
          result: newRow.result_of_play || "",
          yardageGained: yardageNum,
          notes: newRow.notes || "",
          type,
        } as OffensivePlayLogEntry;
      });

      onDataProcessed(parsedData);
    };

    // Read CSV as text, Excel as binary
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext === "csv") reader.readAsText(file);
    else reader.readAsBinaryString(file);
  };

  return (
    <div className="flex flex-col items-center gap-3 p-4 border rounded-2xl shadow-sm bg-gray-50">
      <h2 className="text-lg font-semibold">Upload Offensive Play Log</h2>

      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFileUpload}
        className="cursor-pointer"
      />

      {fileName && <p className="text-sm text-gray-600">Uploaded: {fileName}</p>}
    </div>
  );
};

export default OffensivePlayUploader;
