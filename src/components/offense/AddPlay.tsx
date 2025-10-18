import React, { useState } from "react";
import { OffensivePlayLogEntry, Down } from "../../types/OffensivePlayLogEntry";

// Optional helper for consistent type
const normalizeType = (type: string, playName?: string): "Run" | "Pass" => {
  if (!type && playName) {
    const name = playName.toLowerCase();
    if (["pass", "screen", "slant", "fade", "out", "post", "cross"].some(k => name.includes(k)))
      return "Pass";
    return "Run";
  }
  return type?.toLowerCase() === "pass" ? "Pass" : "Run";
};

interface Props {
  onAdd: (play: OffensivePlayLogEntry) => void;
}

const AddPlay: React.FC<Props> = ({ onAdd }) => {
  const [play, setPlay] = useState<Partial<OffensivePlayLogEntry>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlay({ ...play, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!play.down || !play.distance || !play.playName) return;

    const newPlay: OffensivePlayLogEntry = {
      play: play.play ?? play.playName ?? "",
      down: Number(play.down) as unknown as Down,
      distance: Number(play.distance),
      formation: play.formation || "Unknown",
      playName: play.playName!,
      type: normalizeType(play.type || "", play.playName),
      yardageGained: play.yardageGained ? Number(play.yardageGained) : 0,
      ballPlacement: play.ballPlacement || "Middle",
      fieldPosition: play.fieldPosition ? Number(play.fieldPosition) : 50,
      driveStarter: play.driveStarter ?? false,
      driveNumber: play.driveNumber ? Number(play.driveNumber) : 1,
      notes: play.notes || "",
    };

    onAdd(newPlay);
    setPlay({});
  };

  return (
    <div className="border p-4 rounded-xl">
      <h3 className="font-semibold mb-2">Add Play</h3>
      <div className="grid grid-cols-3 gap-2">
        <input name="down" placeholder="Down" value={play.down || ""} onChange={handleChange} className="border p-1" />
        <input name="distance" placeholder="Distance" value={play.distance || ""} onChange={handleChange} className="border p-1" />
        <input name="formation" placeholder="Formation" value={play.formation || ""} onChange={handleChange} className="border p-1" />
        <input name="playName" placeholder="Play Name" value={play.playName || ""} onChange={handleChange} className="border p-1" />
        <input name="type" placeholder="Type (Run/Pass)" value={play.type || ""} onChange={handleChange} className="border p-1" />
        <input name="yardageGained" placeholder="Yards" value={play.yardageGained || ""} onChange={handleChange} className="border p-1" />
      </div>
      <button onClick={handleSubmit} className="mt-3 px-3 py-1 bg-blue-500 text-white rounded-md">
        Add Play
      </button>
    </div>
  );
};

export default AddPlay;
