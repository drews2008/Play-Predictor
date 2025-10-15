// src/services/fileParser.ts
import { OffensivePlayLogEntry } from "../types/OffensivePlayLogEntry";
import { DefensivePlayLogEntry } from "../types/DefensivePlayLogEntry";

export const fileParser = {
  parseOffensiveFile: (file: File): Promise<OffensivePlayLogEntry[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        try {
          const text = reader.result as string;
          const rows = text.split("\n").filter(Boolean);
          const headers = rows.shift()?.split(",") || [];
          
          const plays: OffensivePlayLogEntry[] = rows.map(row => {
            const values = row.split(",");
            const play: any = {};
            headers.forEach((header, i) => {
              play[header.trim()] = values[i]?.trim() ?? "";
            });
            return play as OffensivePlayLogEntry;
          });

          resolve(plays);
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  },

  parseDefensiveFile: (file: File): Promise<DefensivePlayLogEntry[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        try {
          const text = reader.result as string;
          const rows = text.split("\n").filter(Boolean);
          const headers = rows.shift()?.split(",") || [];

          const plays: DefensivePlayLogEntry[] = rows.map(row => {
            const values = row.split(",");
            const play: any = {};
            headers.forEach((header, i) => {
              play[header.trim()] = values[i]?.trim() ?? "";
            });
            return play as DefensivePlayLogEntry;
          });

          resolve(plays);
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }
};
