import { OffensivePlayLogEntry } from "../types/OffensivePlayLogEntry";

/**
 * OVERALL RUN / PASS
 */
export const getOverallTendencies = (plays: OffensivePlayLogEntry[]) => {
  let run = 0;
  let pass = 0;

  plays.forEach((p) => {
    if (p.playType === "Run") run++;
    else if (p.playType === "Pass") pass++;
  });

  const total = run + pass;

  return {
    run,
    pass,
    runPct: total ? (run / total) * 100 : 0,
    passPct: total ? (pass / total) * 100 : 0,
  };
};

/**
 * FORMATION TENDENCIES
 */
export const getFormationTendencies = (plays: OffensivePlayLogEntry[]) => {
  const formations: Record<string, { run: number; pass: number }> = {};

  plays.forEach((p) => {
    const formation = p.formation || "Unknown";

    if (!formations[formation]) {
      formations[formation] = { run: 0, pass: 0 };
    }

    if (p.playType === "Run") formations[formation].run++;
    if (p.playType === "Pass") formations[formation].pass++;
  });

  return formations;
};

/**
 * DOWN & DISTANCE HELPER
 */
const getDownDistance = (down?: number, distance?: number) => {
  const dn = Number(down);
  const d = Number(distance);

  if (isNaN(dn) || isNaN(d)) return "Other";

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
};/**
 * SITUATIONAL TENDENCIES
 */
export const getSituationalTendencies = (plays: OffensivePlayLogEntry[]) => {
  const grouped: Record<
    string,
    { run: number; pass: number; total: number }
  > = {};

  plays.forEach((p) => {
    const key = getDownDistance(p.down, p.distance);

    if (!grouped[key]) {
      grouped[key] = { run: 0, pass: 0, total: 0 };
    }

    grouped[key].total++;

    if (p.playType === "Run") grouped[key].run++;
    if (p.playType === "Pass") grouped[key].pass++;
  });

  return grouped;
};