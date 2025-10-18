// src/data/sampleDefensivePlayLog.ts
import { DefensivePlayLogEntry } from "../types/DefensivePlayLogEntry";

export const sampleDefensivePlayLog: DefensivePlayLogEntry[] = [
  {
    defensiveFront: "4-3",
    coverageType: "Cover 2",
    pressureType: "No Pressure",
    downDistance: "1st & 10",
    ballPlacement: "Left",
    result: "Run gain",
    yardageAllowed: 4,
    notes: "RB bounced outside"
  },
  {
    defensiveFront: "3-4",
    coverageType: "Man",
    pressureType: "Blitz",
    downDistance: "2nd & 5",
    ballPlacement: "Middle",
    result: "Incomplete pass",
    yardageAllowed: 0,
    notes: "Pressure got to QB"
  },
  {
    defensiveFront: "Nickel",
    coverageType: "Cover 3",
    pressureType: "Zone Blitz",
    downDistance: "3rd & Long",
    ballPlacement: "Right",
    result: "Sack",
    yardageAllowed: -7,
    notes: "QB flushed outside"
  },
  {
    defensiveFront: "Dime",
    coverageType: "Cover 2",
    pressureType: "No Pressure",
    downDistance: "1st & 10",
    ballPlacement: "Middle",
    result: "Run gain",
    yardageAllowed: 3,
    notes: ""
  },
  {
    defensiveFront: "4-3",
    coverageType: "Man",
    pressureType: "Blitz",
    downDistance: "3rd & 5",
    ballPlacement: "Right",
    result: "Incomplete pass",
    yardageAllowed: 0,
    notes: "Coverage tight"
  },
  {
    defensiveFront: "Nickel",
    coverageType: "Zone Blitz",
    pressureType: "Zone Blitz",
    downDistance: "2nd & 8",
    ballPlacement: "Left",
    result: "Run gain",
    yardageAllowed: 2,
    notes: "RB cutback"
  },
  {
    defensiveFront: "3-4",
    coverageType: "Cover 3",
    pressureType: "No Pressure",
    downDistance: "1st & 10",
    ballPlacement: "Left",
    result: "Run gain",
    yardageAllowed: 5,
    notes: ""
  },
  {
    defensiveFront: "Dime",
    coverageType: "Cover 2",
    pressureType: "Blitz",
    downDistance: "3rd & Long",
    ballPlacement: "Middle",
    result: "Sack",
    yardageAllowed: -6,
    notes: "QB pressured from blindside"
  }
];
