export type BallPlacement = "left" | "middle" | "right";

export type DefensivePlayType = "run" | "pass" | "blitz" | "coverage" | "other";

export interface DefensivePlayLogEntry {
  down: number;
  distance: number;
  fieldPosition: string; // e.g., "Own 25", "Opponent 40"
  ballPlacement: BallPlacement;
  driveStarter: string; // "Yes" or "No"
  driveNumber: number;
  defensiveCall: string; // e.g., "Cover 2", "4-3 Stack"
  playName: string; // e.g., "Tackle on QB", "Interception"
  result: string; // e.g., "Tackle", "Sack", "Interception"
  yardageAllowed: number;
  notes: string;
  playType: DefensivePlayType; // Required, similar to offensive
}
