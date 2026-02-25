import { OffensivePlayLogEntry } from "../types/OffensivePlayLogEntry";
import { getCleanData, Play } from "./playEngine";

/* ================= HELPERS ================= */

const pct = (v: number, t: number) => (t ? (v / t) * 100 : 0);
const avg = (v: number, t: number) => (t ? v / t : 0);

const getDistanceBucket = (d: number) => {
  if (d <= 3) return "1-3";
  if (d <= 7) return "4-7";
  return "8+";
};

const getSituationKey = (p: Play) => {
  // ✅ 2PT FIRST (always isolated)
  if (p.isTwoPoint) return "2PT";

  // ✅ GOAL-TO-GO
  if (p.isGoalToGo) return "Goal-To-Go";

  if (p.down === 1 && p.distance === 10) return "1st & 10";

  if (p.down === 2) return `2nd & ${getDistanceBucket(p.distance)}`;
  if (p.down === 3) return `3rd & ${getDistanceBucket(p.distance)}`;
  if (p.down === 4) return `4th & ${getDistanceBucket(p.distance)}`;

  return "Other";
};

/* ================= OVERALL ================= */

export function buildOverall(playLog: OffensivePlayLogEntry[]) {
  const data = getCleanData(playLog);

  let total = 0, run = 0, pass = 0, yards = 0;

  data.forEach(p => {
    total++;
    yards += p.yards;
    p.playType === "run" ? run++ : pass++;
  });

  return {
    total,
    run,
    pass,
    yards,
    runPct: pct(run, total),
    passPct: pct(pass, total),
    avgYards: avg(yards, total),
  };
}

/* ================= FORMATIONS ================= */

export function buildFormations(playLog: OffensivePlayLogEntry[]) {
  const data = getCleanData(playLog);
  const map: Record<string, any> = {};

  data.forEach(p => {
    const key = p.formation;

    if (!map[key]) {
      map[key] = { total: 0, run: 0, pass: 0, yards: 0 };
    }

    const f = map[key];

    f.total++;
    f.yards += p.yards;
    p.playType === "run" ? f.run++ : f.pass++;
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
  const data = getCleanData(playLog);
  const map: Record<string, any> = {};

  data.forEach(p => {
    // ✅ PRIORITY ORDER (DO NOT CHANGE)
    let situation = "";

    if (p.isTwoPoint) {
      situation = "2PT";
    } else if (p.isGoalToGo) {
      situation = "Goal-To-Go";
    } else {
      situation = getSituationKey(p);
    }

    // ✅ ADD HASH TO KEY
    const hashLabel =
      p.hash === "left"
        ? "Left"
        : p.hash === "right"
        ? "Right"
        : "Middle";

    const key = `${situation} (${hashLabel})`;

    if (!map[key]) {
      map[key] = { total: 0, run: 0, pass: 0, yards: 0 };
    }

    const s = map[key];

    s.total++;
    s.yards += p.yards;
    p.playType === "run" ? s.run++ : s.pass++;
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
  const data = getCleanData(playLog);
  const map: Record<string, any> = {};

  data.forEach(p => {
    const key = p.concept || "other";

    if (!map[key]) {
      map[key] = { total: 0, yards: 0, situations: {} };
    }

    const c = map[key];

    c.total++;
    c.yards += p.yards;

    const sit = getSituationKey(p);
    c.situations[sit] = (c.situations[sit] || 0) + 1;
  });

  Object.values(map).forEach((c: any) => {
    c.avgYards = avg(c.yards, c.total);

    c.topSituations = Object.entries(c.situations)
      .sort((a: any, b: any) => b[1] - a[1])
      .slice(0, 3);
  });

  return map;
}

/* ================= MASTER ================= */

export function buildOffensiveDashboard(
  playLog: OffensivePlayLogEntry[]
) {
  return {
    overall: buildOverall(playLog),
    formations: buildFormations(playLog),
    situations: buildSituations(playLog),
    concepts: buildConcepts(playLog),
  };
}