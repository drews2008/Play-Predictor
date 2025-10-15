// src/context/PlayContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { OffensivePlayLogEntry } from "../types/OffensivePlayLogEntry";
import { DefensivePlayLogEntry } from "../types/DefensivePlayLogEntry";

interface PlayContextType {
  offensivePlays: OffensivePlayLogEntry[];
  defensivePlays: DefensivePlayLogEntry[];
  setOffensivePlays: (plays: OffensivePlayLogEntry[]) => void;
  setDefensivePlays: (plays: DefensivePlayLogEntry[]) => void;
  addOffensivePlay: (play: OffensivePlayLogEntry) => void;
  addDefensivePlay: (play: DefensivePlayLogEntry) => void;
}

const PlayContext = createContext<PlayContextType | undefined>(undefined);

export const PlayProvider = ({ children }: { children: ReactNode }) => {
  const [offensivePlays, setOffensivePlaysState] = useState<OffensivePlayLogEntry[]>([]);
  const [defensivePlays, setDefensivePlaysState] = useState<DefensivePlayLogEntry[]>([]);

  const setOffensivePlays = (plays: OffensivePlayLogEntry[]) => setOffensivePlaysState(plays);
  const setDefensivePlays = (plays: DefensivePlayLogEntry[]) => setDefensivePlaysState(plays);

  const addOffensivePlay = (play: OffensivePlayLogEntry) =>
    setOffensivePlaysState(prev => [...prev, play]);

  const addDefensivePlay = (play: DefensivePlayLogEntry) =>
    setDefensivePlaysState(prev => [...prev, play]);

  return (
    <PlayContext.Provider
      value={{ offensivePlays, defensivePlays, setOffensivePlays, setDefensivePlays, addOffensivePlay, addDefensivePlay }}
    >
      {children}
    </PlayContext.Provider>
  );
};

export const usePlayContext = () => {
  const context = useContext(PlayContext);
  if (!context) throw new Error("usePlayContext must be used within a PlayProvider");
  return context;
};
