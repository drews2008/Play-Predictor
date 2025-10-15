// src/services/playlogServices.ts
import { OffensivePlayLogEntry } from '../types/OffensivePlayLogEntry';
import { DefensivePlayLogEntry } from '../types/DefensivePlayLogEntry';
// import { parseCSV } from './fileParser'; // remove or fix if not used

export type PlayType = 'offense' | 'defense';

export const uploadPlayLog = async (file: File, type: PlayType) => {
  // If using parseCSV, make sure it exists and returns Record<string, any>[]
  // const rawData: Record<string, any>[] = await parseCSV(file);

  // For demonstration, assume rawData comes from your Excel parser
  const rawData: Record<string, any>[] = []; // replace with actual parsed data

  if (type === 'offense') {
    const parsed: OffensivePlayLogEntry[] = rawData.map((row: Record<string, any>) => ({
      down: row['Down'],
      distance: row['Distance'],
      play: row['Play'],
      formation: row['Formation'],
      yardageGained: row['Yardage Gained'],
      result: row['Result'],
      driveNumber: row['Drive Number'],
      playName: row['Play Name'], // Add this line
      type: row['Type'], // Add this line
    }));
    return parsed;
  } else {
    const parsed: DefensivePlayLogEntry[] = rawData.map((row: Record<string, any>) => ({
      down: row['Down'],
      distance: row['Distance'],
      coverage: row['Coverage'],
      pressure: row['Pressure'],
      front: row['Front'],
      result: row['Result'],
      driveNumber: row['Drive Number'],
      fieldPosition: row['Field Position'],
      ballPlacement: row['Ball Placement'],
      driveStarter: row['Drive Starter'],
      defensiveCall: row['Defensive Call'],
      personnel: row['Personnel'],
      blitz: row['Blitz'],
      turnover: row['Turnover'],
      penalty: row['Penalty'],
      playName: row['Play Name'],
      yardageAllowed: row['Yardage Allowed'],
      notes: row['Notes'],
      playType: row['Play Type'],
    }));
    return parsed;
  }
};
