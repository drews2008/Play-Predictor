export const parseOffensiveCSV = (text: string) => {
  const rows = text.trim().split("\n").slice(1);

  return rows.map((row) => {
    const cols = row.split(",");

    const play = cols[7]?.trim(); // "Play" column (Run/Pass)

    return {
      down: Number(cols[0]),
      distance: Number(cols[1]),

      ballPlacement: cols[4]?.trim() || "Middle",

      // ✅ FIXED
      playType: play === "Run" ? "Run" : play === "Pass" ? "Pass" : undefined,

      // ✅ NEW
      playConcept: cols[8]?.trim(),

      formation: cols[9]?.trim() || "Unknown",
      playName: cols[10]?.trim(),

      yardageGained: Number(cols[12]) || 0,
    };
  });
};