/* ================= TYPES ================= */
import { OffensivePlayLogEntry } from "../types/OffensivePlayLogEntry";

export type PlayType = "run" | "pass";
export type FieldHash = "left" | "middle" | "right";

export interface Play {
  down: number;
  distance: number;

  formation: string;
  playName: string;

  playType: PlayType;
  concept: string;

  yards: number;

  yardLine: number;
  hash: FieldHash;

  isTwoPoint: boolean;
  isGoalToGo: boolean;
}

/* ================= HELPERS ================= */

function parseNumber(val: any): number {
  const n = Number(val);
  return isNaN(n) ? 0 : n;
}

function parseYards(val: any): number {
  if (typeof val === "number") return val;
  if (!val) return 0;

  const str = String(val).toLowerCase();

  if (str.includes("loss")) {
    const num = parseInt(str.replace(/[^0-9]/g, ""));
    return isNaN(num) ? 0 : -num;
  }

  const num = parseInt(str.replace(/[^0-9-]/g, ""));
  return isNaN(num) ? 0 : num;
}

function parseHash(val: any): FieldHash {
  if (!val) return "middle";

  const str = String(val).toLowerCase();

  if (str.includes("left")) return "left";
  if (str.includes("right")) return "right";
  return "middle";
}

function detectPlayType(playName: string, raw: string): PlayType {
  const r = raw.toLowerCase();
  const n = playName.toLowerCase();

  if (r === "run") return "run";
  if (r === "pass") return "pass";

  const runKeys = ["zone","dive","draw","counter","sweep","power"];
  const passKeys = ["screen","slant","fade","out","curl","post"];

  if (runKeys.some(k => n.includes(k))) return "run";
  if (passKeys.some(k => n.includes(k))) return "pass";

  return "pass";
}

function isHeaderRow(p: any): boolean {
  const downVal = p.Down ?? p.down;
  return downVal === "Down" || downVal === undefined || downVal === null;
}

/* ================= NORMALIZER ================= */
function parseYardLine(val: any): number {
  if (!val) return 50;

  const str = String(val).toLowerCase();

  const num = parseInt(str.replace(/[^0-9]/g, ""));
  if (isNaN(num)) return 50;

  if (str.includes("opp")) return num;
  if (str.includes("own")) return 100 - num;

  // fallback
  return num;
}
export function normalizePlay(p: OffensivePlayLogEntry): Play | null {
  if (isHeaderRow(p)) return null;

  const rawDown = p.Down ?? p.down;
  const rawDistance = p.Distance ?? p.distance;

  const downStr = String(rawDown).toLowerCase().trim();
  const distStr = String(rawDistance).toLowerCase().trim();

  const playName = p["Play Name"] ?? p.playName ?? "Unknown";

  const rawType = String(p.Play ?? p.playType ?? "").toLowerCase();

  const yards = parseYards(
    p["Yardage Gained"] ?? p.yards ?? p.yardageGained
  );

  const yardLine = parseYardLine(
    p["Field Position"] ?? p.fieldPosition
  );

  const hash = parseHash(
    p["Ball Placement"] ?? p.ballPlacement
  );

  /* ================= FIXED DETECTION ================= */

  // ✅ 2PT (catch EVERYTHING)
  const isTwoPoint =
    downStr.includes("2pt") ||
    distStr.includes("2pt") ||
    downStr === "0";

  // ✅ GOAL-TO-GO (must be distance based)
  const isGoalToGo =
    !isTwoPoint &&
    (
      distStr.includes("goal") ||
      downStr.includes("goal")
    );

  // ✅ CLEAN DOWN
  const down = isTwoPoint ? 0 : parseNumber(rawDown);

  // ✅ CLEAN DISTANCE
  const distance = isGoalToGo
    ? 0
    : parseNumber(rawDistance);

  return {
    down,
    distance,

    formation: p.Formation ?? p.formation ?? "Unknown",

    playName,

    playType:
      rawType === "run" || rawType === "pass"
        ? rawType
        : detectPlayType(playName, rawType),

    concept: p["Play concept"] ?? p.playConcept ?? "other",

    yards,

    yardLine,
    hash,

    isTwoPoint,
    isGoalToGo,
  };
}
/* ================= CLEAN ================= */

export function getCleanData(
  playLog: OffensivePlayLogEntry[]
): Play[] {
  return playLog
    .map(normalizePlay)
    .filter((p): p is Play => p !== null);
}