import React from "react";
import FormationTendencies from "../components/offense/FormationTendencies";
import SituationalTendencies from "../components/offense/SituationalTendencies";
import PlayTable from "../components/offense/PlayTable";
import { PlayLogEntry } from "../types/PlayLogEntry";

const samplePlays: PlayLogEntry[] = [
  {
    down: 1,
    distance: 10,
    fieldPosition: "Own 40",
    ballPlacement: "Left",
    play: "Run",
    formation: "I-Formation",
    playName: "Power Run",
    resultOfPlay: "Gain",
    yardageGained: 5,
    driveStarter: "yes",
    driveNumber: "1",
    playType: "Run",
  },
  {
    down: 2,
    distance: 5,
    fieldPosition: "Opponent 45",
    ballPlacement: "Right",
    play: "Pass",
    formation: "Shotgun",
    playName: "Quick Slant",
    resultOfPlay: "Complete",
    yardageGained: 8,
    driveStarter: "no",
    driveNumber: "1",
    playType: "Pass",
  },
];

const OffensiveTendencies: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Offensive Tendencies</h1>

      <FormationTendencies playLogs={samplePlays} />
      <SituationalTendencies playLogs={samplePlays} />
      <PlayTable playLogs={samplePlays} />
    </div>
  );
};

export default OffensiveTendencies;
