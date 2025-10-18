interface DefensivePlayLogEntry {
  defensiveFront: string;
  coverageType: string;
  pressureType: string;
  down?: number;
  distance?: number;
  downDistance?: string; // e.g., "3rd & Long" or "2nd & 6"
  ballPlacement?: "Left" | "Middle" | "Right";
  resultOfPlay?: string;
  yardageAllowed?: number;
  notes?: string;
}
