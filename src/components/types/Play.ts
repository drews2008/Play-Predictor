// src/types/PlayLogEntry.ts
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
  notes?: string;
}
