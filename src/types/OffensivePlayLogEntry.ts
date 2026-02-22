export type Down = 1 | 2 | 3 | 4;
export type Hash = "Left" | "Middle" | "Right";
export type PlayType = "Run" | "Pass";

export interface OffensivePlayLogEntry {
  down: Down;
  distance: number;
  tapeCue?: string;
  fieldPosition?: number;
  ballPlacement: Hash;
  driveStarter?: boolean;
  driveNumber?: number;
  playType?: PlayType;
  formation: string;
  playName: string;
  result?: string;
  yardageGained?: number;
  notes?: string;
}
