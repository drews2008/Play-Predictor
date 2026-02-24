/* ================= TYPES ================= */
export type PlayType = "run" | "pass";

export interface Play {
  down: number;
  distance: number;

  formation: string;
  playName: string;

  playType: PlayType;
  concept: string;

  yards: number;
}

/* ================= IMPORT RAW TYPE ================= */
import { OffensivePlayLogEntry } from "../types/OffensivePlayLogEntry";

/* ================= NORMALIZER ================= */
function normalizePlay(p: OffensivePlayLogEntry): Play {
  const type = (p as any).playType?.toLowerCase();

  return {
    down: Number((p as any).down ?? 0),
    distance: Number((p as any).distance ?? 0),

    formation: (p as any).formation || "Unknown",
    playName:
  p.playName ??
  (p as any)["Play name"] ??
  "Unknown",
    playType: type === "run" ? "run" : "pass",

    concept:
      p.playConcept ??
    (p as any)["Concept"] ??
        "other",
    // ✅ FIXED (handles real CSV variations)
    yards: Number(
      (p as any)["Yardage Gained"] ??
      (p as any).yards ??
      (p as any).yardageGained ??
      0
    ),
  };
}

/* ================= HELPERS ================= */
const pct = (value: number, total: number) =>
  total ? (value / total) * 100 : 0;

const avg = (value: number, total: number) =>
  total ? value / total : 0;

const getDistanceBucket = (distance: number) => {
  if (distance <= 3) return "1-3";
  if (distance <= 7) return "4-7";
  return "8+";
};

const getSituationKey = (p: Play) => {
  if (p.down === 1 && p.distance === 10) return "1st & 10";

  if (p.down === 2) return `2nd & ${getDistanceBucket(p.distance)}`;
  if (p.down === 3) return `3rd & ${getDistanceBucket(p.distance)}`;
  if (p.down === 4) return `4th & ${getDistanceBucket(p.distance)}`;
    if (p.down === 0 && p.distance === 0) return "2PT";
  return "Other";
};

/* ================= FORMATIONS ================= */
export function buildFormations(playLog: OffensivePlayLogEntry[]) {
  const data = playLog.map(normalizePlay);
  const map: Record<string, any> = {};

  data.forEach((p) => {
    const key = p.formation;

    if (!map[key]) {
      map[key] = {
        total: 0,
        run: 0,
        pass: 0,
        yards: 0,
      };
    }

    const f = map[key];

    f.total++;
    f.yards += p.yards;

    if (p.playType === "run") f.run++;
    else f.pass++;
  });

  Object.values(map).forEach((f: any) => {
    f.runPct = pct(f.run, f.total);
    f.passPct = pct(f.pass, f.total);
    f.avgYards = avg(f.yards, f.total);
  });

  return map;
}

/* ================= SITUATIONS ================= */
export function buildSituations(playLog: OffensivePlayLogEntry[]) {
  const data = playLog.map(normalizePlay);
  const map: Record<string, any> = {};

  data.forEach((p) => {
    const key = getSituationKey(p);

    if (!map[key]) {
      map[key] = {
        total: 0,
        run: 0,
        pass: 0,
        yards: 0,
      };
    }

    const s = map[key];

    s.total++;
    s.yards += p.yards;

    if (p.playType === "run") s.run++;
    else s.pass++;
  });

  Object.values(map).forEach((s: any) => {
    s.runPct = pct(s.run, s.total);
    s.passPct = pct(s.pass, s.total);
    s.avgYards = avg(s.yards, s.total);
  });

  return map;
}

/* ================= CONCEPTS ================= */
export function buildConcepts(playLog: OffensivePlayLogEntry[]) {
  const data = playLog.map(normalizePlay);
  const map: Record<string, any> = {};

  data.forEach((p) => {
    const key = p.concept;

    if (!map[key]) {
      map[key] = {
        total: 0,
        yards: 0,
        situations: {},
      };
    }

    const c = map[key];

    c.total++;
    c.yards += p.yards;

    const situation = getSituationKey(p);
    c.situations[situation] =
      (c.situations[situation] || 0) + 1;
  });

  Object.values(map).forEach((c: any) => {
    c.avgYards = avg(c.yards, c.total);

    c.topSituations = Object.entries(c.situations)
      .sort((a: any, b: any) => b[1] - a[1])
      .slice(0, 3);
  });

  return map;
}