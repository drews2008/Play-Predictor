// TYPES (adjust these to match your actual data)
export type Play = {
  down: number;
  distance: number;
  formation: string;
  playName: string;
  result: "run" | "pass";
  yardsGained: number;
};

// -----------------------------
// CORE ENGINE FUNCTIONS
// -----------------------------

// 1. Run / Pass %
export function getRunPassPercentage(plays: Play[]) {
  let run = 0;
  let pass = 0;

  for (const play of plays) {
    if (play.result === "run") run++;
    if (play.result === "pass") pass++;
  }

  const total = plays.length || 1;

  return {
    run: ((run / total) * 100).toFixed(1),
    pass: ((pass / total) * 100).toFixed(1),
    totalPlays: plays.length,
  };
}

// -----------------------------

// 2. Formation Tendencies
export function getFormationTendencies(plays: Play[]) {
  const formations: Record<string, { run: number; pass: number; total: number }> = {};

  for (const play of plays) {
    if (!formations[play.formation]) {
      formations[play.formation] = { run: 0, pass: 0, total: 0 };
    }

    const f = formations[play.formation];

    if (play.result === "run") f.run++;
    if (play.result === "pass") f.pass++;

    f.total++;
  }

  // Convert to percentages
  return Object.entries(formations).map(([formation, data]) => ({
    formation,
    runPercent: ((data.run / data.total) * 100).toFixed(1),
    passPercent: ((data.pass / data.total) * 100).toFixed(1),
    total: data.total,
  }));
}

// -----------------------------

// 3. Situational Tendencies
export function getSituationalTendencies(plays: Play[]) {
  const buckets = {
    "1st & 10": [],
    "2nd & 1-3": [],
    "2nd & 4-7": [],
    "2nd & 8+": [],
    "3rd & short": [],
    "3rd & medium": [],
    "3rd & long": [],
    "4th down": [],
  } as Record<string, Play[]>;

  for (const play of plays) {
    if (play.down === 1) {
      buckets["1st & 10"].push(play);
    } else if (play.down === 2) {
      if (play.distance <= 3) buckets["2nd & 1-3"].push(play);
      else if (play.distance <= 7) buckets["2nd & 4-7"].push(play);
      else buckets["2nd & 8+"].push(play);
    } else if (play.down === 3) {
      if (play.distance <= 3) buckets["3rd & short"].push(play);
      else if (play.distance <= 7) buckets["3rd & medium"].push(play);
      else buckets["3rd & long"].push(play);
    } else if (play.down === 4) {
      buckets["4th down"].push(play);
    }
  }

  const result: Record<string, any> = {};

  for (const key in buckets) {
    result[key] = getRunPassPercentage(buckets[key]);
  }

  return result;
}

// -----------------------------

// 4. Top Plays (by frequency + efficiency)
export function getTopPlays(plays: Play[]) {
  const map: Record<string, { count: number; yards: number }> = {};

  for (const play of plays) {
    if (!map[play.playName]) {
      map[play.playName] = { count: 0, yards: 0 };
    }

    map[play.playName].count++;
    map[play.playName].yards += play.yardsGained;
  }

  return Object.entries(map)
    .map(([playName, data]) => ({
      playName,
      count: data.count,
      avgYards: data.yards / data.count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}