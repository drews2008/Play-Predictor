// engine/playEngine.ts

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

/* ================= HELPERS ================= */
const pct = (value: number, total: number) => (total ? (value / total) * 100 : 0);
const avg = (value: number, total: number) => (total ? value / total : 0);

const isSuccessful = (p: Play) => {
  if (p.down === 1) return p.yards >= 4;
  if (p.down === 2) return p.yards >= p.distance * 0.5;
  if (p.down >= 3) return p.yards >= p.distance;
  return false;
};

const getDistanceBucket = (distance: number) => {
  if (distance <= 3) return "1-3";
  if (distance <= 7) return "4-7";
  return "8+";
};

const getSituationKey = (p: Play) => {
  if (p.down === 1 && p.distance === 10) return "1st & 10";
  if ([2, 3, 4].includes(p.down)) return `${p.down}th & ${getDistanceBucket(p.distance)}`;
  return "other";
};

/* ================= MAIN ENGINE ================= */
export function buildEngine(playData: Play[]) {
  return {
    formations: buildFormations(playData),
    situations: buildSituations(playData),
    concepts: buildConcepts(playData),
  };
}

/* ================= FORMATIONS ================= */
function buildFormations(data: Play[]) {
  const map: Record<string, any> = {};

  data.forEach((p) => {
    const key = p.formation || "Unknown";
    if (!map[key]) map[key] = { total: 0, run: 0, pass: 0, yards: 0, plays: {} };
    const f = map[key];
    f.total++;
    f.yards += p.yards;
    if (p.playType === "run") f.run++;
    if (p.playType === "pass") f.pass++;
    f.plays[p.playName] = (f.plays[p.playName] || 0) + 1;
  });

  Object.values(map).forEach((f: any) => {
    f.runPct = pct(f.run, f.total);
    f.passPct = pct(f.pass, f.total);
    f.avgYards = avg(f.yards, f.total);
    f.topPlays = Object.entries(f.plays).sort((a: any, b: any) => b[1] - a[1]).slice(0, 3);
  });

  return map;
}

/* ================= SITUATIONS ================= */
function buildSituations(data: Play[]) {
  const map: Record<string, any> = {};

  data.forEach((p) => {
    const key = getSituationKey(p);
    if (!map[key]) map[key] = { total: 0, run: 0, pass: 0, yards: 0 };
    const s = map[key];
    s.total++;
    s.yards += p.yards;
    if (p.playType === "run") s.run++;
    if (p.playType === "pass") s.pass++;
  });

  Object.values(map).forEach((s: any) => {
    s.runPct = pct(s.run, s.total);
    s.passPct = pct(s.pass, s.total);
    s.avgYards = avg(s.yards, s.total);
  });

  return map;
}

/* ================= CONCEPTS ================= */
function buildConcepts(data: Play[]) {
  const map: Record<string, any> = {};

  data.forEach((p) => {
    const key = p.concept || "other";
    const situation = getSituationKey(p);

    if (!map[key]) {
      map[key] = {
        total: 0,
        yards: 0,
        situations: {}, // 🔥 NEW
      };
    }

    const c = map[key];

    c.total++;
     c.yards += typeof p.yards === "number" ? p.yards : 0;
    // 🔥 track situations per concept
    c.situations[situation] = (c.situations[situation] || 0) + 1;
  });

  Object.values(map).forEach((c: any) => {
    c.avgYards = c.total ? Number((c.yards / c.total).toFixed(2)) : 0;

    // 🔥 sort situations (most used first)
    c.topSituations = Object.entries(c.situations)
      .sort((a: any, b: any) => b[1] - a[1])
      .slice(0, 5);
  });

  return map;
}