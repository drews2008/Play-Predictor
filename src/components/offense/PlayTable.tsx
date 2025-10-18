import React from "react";
import { OffensivePlayLogEntry } from "../../types/OffensivePlayLogEntry";

interface Props {
  playLog: OffensivePlayLogEntry[];
}

// Helper to get most common value in an array
const mode = <T, >(arr: T[]): T | null => {
  if (!arr.length) return null;
  const counts: Record<string, number> = {};
  arr.forEach(val => {
    const key = String(val);
    counts[key] = (counts[key] || 0) + 1;
  });
  let max = 0;
  let result: any = null;
  Object.entries(counts).forEach(([key, count]) => {
    if (count > max) {
      max = count;
      result = key;
    }
  });
  return result;
};

const PlayTable: React.FC<Props> = ({ playLog }) => {
  const groupByPlay = () => {
    const result: Record<string, OffensivePlayLogEntry[]> = {};
    playLog.forEach(p => {
      const playName = p.playName || p.play || "Unnamed";
      if (!result[playName]) result[playName] = [];
      result[playName].push(p);
    });

    return Object.entries(result).map(([playName, plays]) => {
      const total = plays.length;
      const formations = plays.map(p => p.formation || "Unknown");
      const situations = plays.map(p => `${p.down} & ${p.distance}`);
      const yardage = plays.map(p => p.yardageGained || 0);

      // Breakdown per down-distance
      const breakdown: Record<string, number> = {};
      situations.forEach(s => {
        breakdown[s] = (breakdown[s] || 0) + 1;
      });

      return {
        playName,
        total,
        mostCommonFormation: mode(formations),
        mostCommonSituation: mode(situations),
        averageYardage: (yardage.reduce((a, b) => a + b, 0) / total).toFixed(1),
        breakdown,
      };
    });
  };

  const data = groupByPlay();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Play Breakdown</h3>
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2 py-1 text-left">Play Name</th>
            <th className="border px-2 py-1 text-center">Total Runs</th>
            <th className="border px-2 py-1 text-left">Most Common Formation</th>
            <th className="border px-2 py-1 text-left">Most Common Situation</th>
            <th className="border px-2 py-1 text-center">Average Yards</th>
            <th className="border px-2 py-1 text-left">Down/Distance Breakdown</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td className="border px-2 py-1">{d.playName}</td>
              <td className="border px-2 py-1 text-center">{d.total}</td>
              <td className="border px-2 py-1">{d.mostCommonFormation}</td>
              <td className="border px-2 py-1">{d.mostCommonSituation}</td>
              <td className="border px-2 py-1 text-center">{d.averageYardage}</td>
              <td className="border px-2 py-1">
                {Object.entries(d.breakdown)
                  .map(([situation, count]) => `${situation}: ${count}`)
                  .join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayTable;
