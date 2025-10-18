// src/components/defense/DefensiveTendencies.tsx
import React from "react";
import CoverageTable from "./CoverageBreakdown";
import PressureTable from "./PressureTrends";
import FrontTable from "./FrontAnalysis"

export interface DefensivePlayLogEntry {
  defensiveFront: string;
  coverageType: string;
  pressureType: string;
  down?: number;
  distance?: number;
  ballPlacement?: "Left" | "Middle" | "Right";
  resultOfPlay?: string;
  yardageAllowed?: number;
  notes?: string;
}

interface Props {
  playLog: DefensivePlayLogEntry[];
}

const hashes = ["Left", "Middle", "Right"];

const getSituationBucket = (down?: number, distance?: number): string => {
  const d = Number(distance);
  const dn = Number(down);

  if (!dn || isNaN(dn)) return "First Play";

  switch (dn) {
    case 1:
      return "1st & 10";
    case 2:
      if (d >= 1 && d <= 3) return "2nd & 1–3";
      if (d >= 4 && d <= 7) return "2nd & 4–7";
      if (d >= 8) return "2nd & 8+";
      return "2nd & ?";
    case 3:
      if (d >= 1 && d <= 3) return "3rd & 1–3";
      if (d >= 4 && d <= 7) return "3rd & 4–7";
      if (d >= 8) return "3rd & 8+";
      return "3rd & ?";
    case 4:
      if (d <= 2) return "4th & Short";
      if (d <= 5) return "4th & Medium";
      return "4th & Long";
    default:
      return "Other";
  }
};

const DefensiveTendencies: React.FC<Props> = ({ playLog }) => {
  const grouped: Record<
    string,
    Record<
      string,
      {
        coverages: Record<string, number>;
        pressures: Record<string, number>;
        fronts: Record<string, number>;
        total: number;
      }
    >
  > = {};

  hashes.forEach((hash) => (grouped[hash] = {}));

  playLog.forEach((play) => {
    const hash = play.ballPlacement || "Middle";
    const situation = getSituationBucket(play.down, play.distance);

    if (!grouped[hash][situation]) {
      grouped[hash][situation] = { coverages: {}, pressures: {}, fronts: {}, total: 0 };
    }

    const g = grouped[hash][situation];
    g.total++;
    g.coverages[play.coverageType || "Unknown"] = (g.coverages[play.coverageType || "Unknown"] || 0) + 1;
    g.pressures[play.pressureType || "Unknown"] = (g.pressures[play.pressureType || "Unknown"] || 0) + 1;
    g.fronts[play.defensiveFront || "Unknown"] = (g.fronts[play.defensiveFront || "Unknown"] || 0) + 1;
  });

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Defensive Tendencies by Hash</h3>
      {hashes.map((hash) => {
        const totals: Record<string, number> = {};
        const coverages: Record<string, Record<string, number>> = {};
        const pressures: Record<string, Record<string, number>> = {};
        const fronts: Record<string, Record<string, number>> = {};

        Object.entries(grouped[hash]).forEach(([situation, stats]) => {
          coverages[situation] = stats.coverages;
          pressures[situation] = stats.pressures;
          fronts[situation] = stats.fronts;
          totals[situation] = stats.total;
        });

        return (
          <div key={hash} className="grid grid-cols-3 gap-4 mb-6">
            <CoverageTable hash={hash} data={coverages} totals={totals} />
            <PressureTable hash={hash} data={pressures} totals={totals} />
            <FrontTable hash={hash} data={fronts} totals={totals} />
          </div>
        );
      })}
    </div>
  );
};

export default DefensiveTendencies;
