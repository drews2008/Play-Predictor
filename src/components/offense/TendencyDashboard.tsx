import React, { useState, useEffect } from "react";
import FormationTendencies from "./FormationTendencies";
import SituationalTendencies from "./SituationalTendencies";
import PlayTable from "./PlayTable";
import Charts from "./Charts";
import HeatChart from "./HeatChart";

export interface PlayLogEntry {
  down: number;
  distance: number;
  tapeCue: string;
  fieldPosition: string;
  ballPosition: "Left" | "Middle" | "Right";
  driveStarter: boolean;
  driveNumber: number;
  playType: "Run" | "Pass" | "Other";
  playName: string;
  resultOfPlay: string;
  yardageGained: number;
  notes?: string;
  x: number;  // X coordinate on field (yards)
  y: number;  // Y coordinate on field (yards)
}

const TendencyDashboard: React.FC = () => {
  const [playLogs, setPlayLogs] = useState<PlayLogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    // TODO: Replace with real data loading/parsing logic
    const dummyData: PlayLogEntry[] = [
      {
        down: 1,
        distance: 10,
        tapeCue: "First play",
        fieldPosition: "Own 40",
        ballPosition: "Middle",
        driveStarter: true,
        driveNumber: 1,
        playType: "Run",
        playName: "Inside Zone",
        resultOfPlay: "Gain 5 yards",
        yardageGained: 5,
        notes: "Good blocking",
        x: 40,
        y: 26.65,
      },
      // add more dummy plays here...
    ];
    setPlayLogs(dummyData);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading tendencies...</div>;
  if (error) return <div>Error: {error}</div>;
  if (playLogs.length === 0) return <div>No play logs uploaded.</div>;

  return (
    <div>
      <h1>Tendency Dashboard</h1>
      <FormationTendencies playLogs={playLogs} />
      <SituationalTendencies playLogs={playLogs} />
      <Charts playLogs={playLogs} />
      <HeatChart playLogs={playLogs} />
      <PlayTable playLogs={playLogs} />
    </div>
  );
};

export default TendencyDashboard;
