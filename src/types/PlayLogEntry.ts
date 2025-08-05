export interface PlayLogEntry {
  down: number;
  distance: number;
  fieldPosition: string;
  ballPlacement: string;
  play: string;
  formation: string;
  playName: string;
  resultOfPlay: string;
  yardageGained: number;
  driveStarter: string;  // Changed to string to avoid boolean errors
  driveNumber: string;   // Changed to string for consistency
  playType: "Run" | "Pass";
}
