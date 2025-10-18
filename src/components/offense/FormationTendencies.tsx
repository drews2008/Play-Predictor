import React from "react";
import { OffensivePlayLogEntry } from "../../types/OffensivePlayLogEntry";

interface Props {
  playLog: OffensivePlayLogEntry[];
}

// Smarter type detector
const getPlayType = (play: OffensivePlayLogEntry): "Run" | "Pass" => {
  // Normalize all possible field names to lowercase for matching
  const rawType = String((play as any).Type || (play as any).type || "").toLowerCase();
  const rawPlay = String((play as any).Play || (play as any).play || "").toLowerCase();
  const rawPlayName = String((play as any).PlayName || (play as any).playName || "").toLowerCase();

  const combined = `${rawType} ${rawPlay} ${rawPlayName}`;

  // If the CSV explicitly says run/pass, trust it
  if (combined.includes("pass")) return "Pass";
  if (combined.includes("run")) return "Run";

  // Additional heuristic detection
  const passKeywords = ["slant", "curl", "fade", "out", "post", "screen", "cross", "stick", "mesh"];
  const runKeywords = ["zone", "trap", "power", "iso", "draw", "counter", "toss", "sweep"];

  // RPO and Play Action count as RUN by default
  if (combined.includes("rpo") || combined.includes("play action")) return "Run";
  if (passKeywords.some(k => combined.includes(k))) return "Pass";
  if (runKeywords.some(k => combined.includes(k))) return "Run";

  return "Run"; // default fallback
};

const FormationTendencies: React.FC<Props> = ({ playLog }) => {
  const groupByFormation = () => {
    const result: Record<string, { runs: number; passes: number; plays: Record<string, number> }> = {};

    playLog.forEach(p => {
      const formation =
        (p as any).Formation ||
        (p as any).formation ||
        (p as any).Form ||
        "Unknown";

      if (!result[formation])
        result[formation] = { runs: 0, passes: 0, plays: {} };

      const playType = getPlayType(p);
      if (playType === "Run") result[formation].runs++;
      else result[formation].passes++;

      const playName =
        (p as any).PlayName ||
        (p as any).playName ||
        (p as any).Play ||
        "Unnamed";

      result[formation].plays[playName] =
        (result[formation].plays[playName] || 0) + 1;
    });

    return Object.entries(result).map(([formation, stats]) => {
      const total = stats.runs + stats.passes;
      const topPlays = Object.entries(stats.plays)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([name]) => name)
        .join(", ");

      return {
        formation,
        runPct: total ? ((stats.runs / total) * 100).toFixed(1) : "0.0",
        passPct: total ? ((stats.passes / total) * 100).toFixed(1) : "0.0",
        topPlays,
      };
    });
  };

  const data = groupByFormation();

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Formation Tendencies</h3>
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2 py-1 text-left">Formation</th>
            <th className="border px-2 py-1 text-center">Run %</th>
            <th className="border px-2 py-1 text-center">Pass %</th>
            <th className="border px-2 py-1 text-left">Top Plays</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td className="border px-2 py-1">{d.formation}</td>
              <td className="border px-2 py-1 text-center">{d.runPct}</td>
              <td className="border px-2 py-1 text-center">{d.passPct}</td>
              <td className="border px-2 py-1">{d.topPlays}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormationTendencies;
