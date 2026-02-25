export interface OffensivePlayLogEntry {
  down: number | string;
  distance: number | string;

  formation?: string;
  playName?: string;

  playType?: string;
  playConcept?: string;

  yards?: number | string;

  // optional flags
  isGoalToGo?: boolean;

  // allow CSV flexibility
  [key: string]: any;
}