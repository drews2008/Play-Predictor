const enum Down {
  First = 1,
  Second = 2,
  Third = 3,
  Fourth = 4,
  twopt = "2 pt. Conv.",
}

const enum Hash {
  Left = "Left",
  Middle = "Middle",
  Right = "Right",
}

const enum PlayType {
  Run = "Run",
  Pass = "Pass",
  Other = "Other",
}

export interface OffensivePlayLogEntry {
  down: Down;
  distance: number;
  ballPlacement: Hash;
  playType?: PlayType;

  formation: string;
  playName: string;

  playConcept?: string; // ← ADD THIS

  tapeCue?: string;
  fieldPosition?: number;
  driveStarter?: boolean;
  driveNumber?: number;
  result?: string;
  yardageGained?: number;
  notes?: string;
}