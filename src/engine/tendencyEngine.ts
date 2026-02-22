import { OffensivePlayLogEntry } from "../types/OffensivePlayLogEntry";

/**
 * Normalize helper (CRITICAL)
 */
const normalize = (val?: string) =>
  val?.trim().toLowerCase() || "";

/**
 * OVERALL RUN / PASS
 */
export const getOverallTendencies = (plays: OffensivePlayLogEntry[]) => {
  let run = 0;
  let pass = 0;

  plays.forEach((p) => {
    const type = normalize(p.playType);

    if (type === "run") run++;
    else if (type === "pass") pass++;
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
 * FORMATION
 */
export const getFormationTendencies = (plays: OffensivePlayLogEntry[]) => {
  const formations: Record<string, { run: number; pass: number }> = {};

  plays.forEach((p) => {
    const formation = p.formation?.trim() || "Unknown";
    const type = normalize(p.playType);

    if (!formations[formation]) {
      formations[formation] = { run: 0, pass: 0 };
    }

    if (type === "run") formations[formation].run++;
    if (type === "pass") formations[formation].pass++;
  });

  return formations;
};

/**
 * DOWN + DISTANCE
 */
const getDownDistance = (down?: number, distance?: number) => {
  const dn = Number(down);
  const d = Number(distance);

  if (isNaN(dn) || isNaN(d)) return "Other";

  if (dn === 1) return "1st & 10";

  if (dn === 2) {
    if (d <= 3) return "2nd & 1–3";
    if (d <= 7) return "2nd & 4–7";
    return "2nd & 8+";
  }

  if (dn === 3) {
    if (d <= 3) return "3rd & 1–3";
    if (d <= 7) return "3rd & 4–7";
    return "3rd & 8+";
  }

  if (dn === 4) return "4th Down";

  return "Other";
};

/**
 * SITUATIONAL (WITH HASH)
 */
export const getSituationalTendencies = (plays: OffensivePlayLogEntry[]) => {
  const grouped: Record<
    string,
    {
      Left: { run: number; pass: number; total: number };
      Middle: { run: number; pass: number; total: number };
      Right: { run: number; pass: number; total: number };
    }
  > = {};

  plays.forEach((p) => {
    const situation = getDownDistance(p.down, p.distance);

    const rawHash = p.ballPlacement?.trim();
    const hash =
      rawHash === "Left" || rawHash === "Right" || rawHash === "Middle"
        ? rawHash
        : "Middle";

    if (!grouped[situation]) {
      grouped[situation] = {
        Left: { run: 0, pass: 0, total: 0 },
        Middle: { run: 0, pass: 0, total: 0 },
        Right: { run: 0, pass: 0, total: 0 },
      };
    }

    const bucket = grouped[situation][hash];
    const type = normalize(p.playType);

    bucket.total++;

    if (type === "run") bucket.run++;
    if (type === "pass") bucket.pass++;
  });

  return grouped;
};
/**
 * PLAY CONCEPT BREAKDOWN (COUNTS, NOT %)
 */export const getConceptTendencies = (plays: OffensivePlayLogEntry[]) => {
  const concepts: Record<
    string,
    { run: number; pass: number; total: number }
  > = {};

  plays.forEach((p) => {
    const concept = (p.playConcept || p.playName || "Unknown").trim();

    if (!concepts[concept]) {
      concepts[concept] = { run: 0, pass: 0, total: 0 };
    }

    const type = normalize(p.playType);

    concepts[concept].total++;

    if (type === "run") concepts[concept].run++;
    if (type === "pass") concepts[concept].pass++;
  });

  return concepts;
};