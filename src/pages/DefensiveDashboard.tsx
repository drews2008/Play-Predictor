import React, { useState } from "react";
import DefensiveTendencies from "../components/defense/DefensiveTendencies";
import { Card } from "../components/ui/card";
import * as XLSX from "xlsx";
import BackButton from "../components/ui/Button";

export default function MainDashboard() {
  const [defensiveData, setDefensiveData] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = ev.target?.result;
      if (!data) return;

      let parsed: any[] = [];
      if (file.name.endsWith(".csv")) {
        const text = data.toString();
        const rows = text.split("\n").filter(Boolean);
        const headers = rows[0].split(",");
        parsed = rows.slice(1).map((row) => {
          const values = row.split(",");
          const obj: any = {};
          headers.forEach((h, i) => {
            obj[h.trim()] = values[i]?.trim() || "";
          });
          return obj;
        });
      } else if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        parsed = XLSX.utils.sheet_to_json(sheet);
      }

      // Normalize headers for DefensiveTendencies
      const normalized = parsed.map((row) => ({
        defensiveFront: row["Defensive Front"] || row["defensiveFront"] || "Unknown",
        coverageType: row["Coverage Type"] || row["coverageType"] || "Unknown",
        pressureType: row["Pressure Type"] || row["pressureType"] || "Unknown",
        down: Number(row["Down"] || row["down"] || 0),
        distance: Number(row["Distance"] || row["distance"] || 0),
        ballPlacement: row["Ball Placement"] || row["ballPlacement"] || "Middle",
        resultOfPlay: row["Result of Play"] || row["resultOfPlay"] || "Unknown",
        yardageAllowed: Number(row["Yardage Allowed"] || row["yardageAllowed"] || 0),
        notes: row["Notes"] || row["notes"] || "",
      }));

      setDefensiveData(normalized);
    };

    if (file.name.endsWith(".csv")) reader.readAsText(file);
    else reader.readAsBinaryString(file);
  };

  return (
    <div className="space-y-6 p-6">
      <BackButton />
      <h1 className="text-2xl font-bold">Defensive Dashboard</h1>

      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-2">Upload Defensive Play Log</h2>
        <input
          type="file"
          accept=".csv,.xlsx"
          onChange={handleFileUpload}
          className="border p-2 rounded w-full"
        />
      </Card>

      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-2">Defensive Tendencies</h2>
        {defensiveData.length > 0 ? (
          <DefensiveTendencies playLog={defensiveData} />
        ) : (
          <div className="text-gray-600 text-center py-8">
            No defensive data loaded. Upload a play log above.
          </div>
        )}
      </Card>
    </div>
  );
}
