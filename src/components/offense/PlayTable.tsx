import React from "react";
import OffensivePlaylogEntry from "../types/OffensivePlayLogEntry";

interface Props {
  plays: OffensivePlaylogEntry[];
}

const PlayTable: React.FC<Props> = ({ plays }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Play Table</h3>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border p-2">Play Name</th>
            <th className="border p-2">Formation</th>
            <th className="border p-2">Result</th>
            <th className="border p-2">Yards</th>
          </tr>
        </thead>
        <tbody>
          {plays.map((play, idx) => (
            <tr key={idx}>
              <td className="border p-2">{play.PlayName}</td>
              <td className="border p-2">{play.Formation}</td>
              <td className="border p-2">{play.ResultOfPlay}</td>
              <td className="border p-2">{play.YardageGained}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayTable;
