export const parseOffensiveCSV = (csv: string) => {
  const lines = csv.trim().split("\n");
  const headers = lines[0].split(",");

  return lines.slice(1).map((line) => {
    const values = line.split(",");

    const row: any = {};
    headers.forEach((header, i) => {
      row[header.trim()] = values[i]?.trim();
    });

    return {
      down: Number(row.down),
      distance: Number(row.distance),
      ballPlacement: row.ballPlacement,
      playType: row.playType,
      formation: row.formation,
      playName: row.playName,
      yardageGained: Number(row.yardageGained),
    };
  });
};