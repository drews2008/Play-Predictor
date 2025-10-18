import React from "react";
import { OffensivePlayLogEntry } from "../../types/OffensivePlayLogEntry";

// --- Helper to detect Run or Pass ---
const getPlayType = (play: OffensivePlayLogEntry): "Run" | "Pass" => {
  const type = String((play as any).Type || play.type || "").toLowerCase();
  const playName = String((play as any).PlayName || play.playName || play.play || "").toLowerCase();

  const passKeywords = ["pass", "slant", "curl", "fade", "out", "post", "screen", "cross", "stick", "mesh"];
  const runKeywords = ["run", "zone", "trap", "power", "iso", "draw", "counter", "toss", "sweep"];

  if (type.includes("pass") || passKeywords.some(k => playName.includes(k))) return "Pass";
  if (type.includes("run") || runKeywords.some(k => playName.includes(k))) return "Run";
  if (playName.includes("rpo") || playName.includes("play action")) return "Run";

  return "Run"; // fallback
};

// --- Down & Distance Bucket Helper ---
const getSituationBucket = (down: number | string | undefined, distance: number | string | undefined): string => {
  const d = Number(distance);
  const dn = Number(down);

  if (!dn || isNaN(dn)) return "First Play of Drive";

  switch (dn) {
    case 1:
      return "1st & 10";
    case 2:
      if (d <= 3) return "2nd & 1–3";
      if (d <= 7) return "2nd & 4–7";
      return "2nd & 8+";
    case 3:
      if (d <= 3) return "3rd & 1–3";
      if (d <= 7) return "3rd & 4–7";
      return "3rd & 8+";
    case 4:
      return "4th Down";
    default:
      return "Other";
  }
};

interface Props {
  playLog: OffensivePlayLogEntry[];
}

const hashes = ["Left", "Middle", "Right"];

const SituationalTendencies: React.FC<Props> = ({ playLog }) => {
  // --- Group by hash and situation bucket ---
  const grouped: Record<string, Record<string, { runs: number; passes: number; plays: Record<string, number> }>> = {};

  hashes.forEach(hash => {
    grouped[hash] = {};
  });

  playLog.forEach(play => {
    const hash = (play.ballPlacement || "Middle").trim();
    const situation = getSituationBucket(play.down, play.distance);

    if (!grouped[hash][situation]) grouped[hash][situation] = { runs: 0, passes: 0, plays: {} };

    const type = getPlayType(play);
    if (type === "Run") grouped[hash][situation].runs++;
    else grouped[hash][situation].passes++;

    const playName = play.playName || play.play || "Unnamed";
    grouped[hash][situation].plays[playName] = (grouped[hash][situation].plays[playName] || 0) + 1;
  });

  // --- Define order of situations ---
  const situationOrder = [
    "First Play of Drive",
    "1st & 10",
    "2nd & 1–3",
    "2nd & 4–7",
    "2nd & 8+",
    "3rd & 1–3",
    "3rd & 4–7",
    "3rd & 8+",
    "4th Down",
    "Other",
  ];

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Situational Tendencies by Hash</h3>
      <div className="grid grid-cols-3 gap-4">
        {hashes.map(hash => (
          <div key={hash}>
            <h4 className="font-semibold mb-2 text-center">{hash} Hash</h4>
            <table className="min-w-full border text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="border px-2 py-1 text-left">Situation</th>
                  <th className="border px-2 py-1 text-center">Run %</th>
                  <th className="border px-2 py-1 text-center">Pass %</th>
                  <th className="border px-2 py-1 text-left">Top Plays</th>
                </tr>
              </thead>
              <tbody>
                {situationOrder
                  .filter(sit => grouped[hash][sit])
                  .map((situation, i) => {
                    const stats = grouped[hash][situation];
                    const total = stats.runs + stats.passes;
                    const topPlays = Object.entries(stats.plays)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 3)
                      .map(([name]) => name)
                      .join(", ");
                    return (
                      <tr key={i} className="even:bg-blue-50">
                        <td className="border px-2 py-1">{situation}</td>
                        <td className="border px-2 py-1 text-center">
                          {total ? ((stats.runs / total) * 100).toFixed(0) + "%" : "0%"}
                        </td>
                        <td className="border px-2 py-1 text-center">
                          {total ? ((stats.passes / total) * 100).toFixed(0) + "%" : "0%"}
                        </td>
                        <td className="border px-2 py-1">{topPlays}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SituationalTendencies;
