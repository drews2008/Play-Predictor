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
    if (p.isTwoPoint) return "2pt";


  // ✅ GOAL-TO-GO

  if (p.isGoalToGo) {
    if (p.distance <= 3) return "GoalToGo 1-3";
    if (p.distance <= 6) return "GoalToGo 4-6";
    return "GoalToGo 7+";
  }
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
export function buildSituations(playLog: OffensivePlayLogEntry[]) {
  const plays = getCleanData(playLog);

  const standard: Record<string, Play[]> = {};
  const goalToGo: Record<string, Play[]> = {};
  const twoPoint: Record<string, Play[]> = {};

  plays.forEach((play) => {
    // ✅ 1. TWO POINT
    if (play.isTwoPoint) {
      const key = `2PT (${play.hash})`;
      if (!twoPoint[key]) twoPoint[key] = [];
      twoPoint[key].push(play);
      return;
    }

    // ✅ 2. GOAL TO GO
    if (play.isGoalToGo) {
      const bucket =
        play.distance <= 3 ? "1-3" :
        play.distance <= 6 ? "4-6" :
        "7+";

      const key = `${play.down} & Goal (${bucket}) (${play.hash})`;

      if (!goalToGo[key]) goalToGo[key] = [];
      goalToGo[key].push(play);
      return;
    }

    // ✅ 3. NORMAL
    let key = "";

    if (play.down === 1 && play.distance === 10) {
      key = `1st & 10 (${play.hash})`;
    } else {
      const bucket =
        play.distance <= 3 ? "1-3" :
        play.distance <= 7 ? "4-7" :
        "8+";

      key = `${play.down} & ${bucket} (${play.hash})`;
    }

    if (!standard[key]) standard[key] = [];
    standard[key].push(play);
  });

  function format(map: Record<string, Play[]>) {
    return Object.fromEntries(
      Object.entries(map).map(([key, group]) => {
        const run = group.filter(p => p.playType === "run").length;
        const pass = group.filter(p => p.playType === "pass").length;
        const total = group.length;

        return [
          key,
          {
            runPct: pct(run, total),
            passPct: pct(pass, total),
            avgYards: avg(
              group.reduce((sum, p) => sum + p.yards, 0),
              total
            ),
          },
        ];
      })
    );
  }

  return {
    standard: format(standard),
    goalToGo: format(goalToGo),
    twoPoint: format(twoPoint),
  };
}/* ================= CONCEPTS ================= */

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