import { OffensivePlayLogEntry } from "../types/OffensivePlayLogEntry";

export const tendencyService = {
  getFormationTendencies: (plays: OffensivePlayLogEntry[]) => {
    const result: Record<string, { run: number; pass: number; total: number }> = {};

    plays.forEach((play) => {
      const formation = play.formation || "Unknown";
      if (!result[formation]) result[formation] = { run: 0, pass: 0, total: 0 };

      if (play.type?.toLowerCase() === "run") result[formation].run++;
      else if (play.type?.toLowerCase() === "pass") result[formation].pass++;

      result[formation].total++;
    });

    Object.keys(result).forEach((formation) => {
      const data = result[formation];
      data.run = Math.round((data.run / data.total) * 100);
      data.pass = Math.round((data.pass / data.total) * 100);
    });

    return result;
  },

  getSituationalTendencies: (plays: OffensivePlayLogEntry[]) => {
    const result: Record<string, { run: number; pass: number; total: number }> = {};

    plays.forEach((play) => {
      // compute situation dynamically
      const situation = `${play.down || "?"} & ${play.distance || "?"} (${play.ballPlacement || play.ballPlacement || "Unknown"})`;

      if (!result[situation]) result[situation] = { run: 0, pass: 0, total: 0 };

      if (play.type?.toLowerCase() === "run") result[situation].run++;
      else if (play.type?.toLowerCase() === "pass") result[situation].pass++;

      result[situation].total++;
    });

    Object.keys(result).forEach((situation) => {
      const data = result[situation];
      data.run = Math.round((data.run / data.total) * 100);
      data.pass = Math.round((data.pass / data.total) * 100);
    });

    return result;
  },
};
