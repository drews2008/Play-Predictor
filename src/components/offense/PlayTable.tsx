import React from "react";
import { OffensivePlayLogEntry } from "../../types/OffensivePlayLogEntry";

interface Props {
  playLog: OffensivePlayLogEntry[];
}

const PlayTable: React.FC<Props> = ({ playLog }) => (
  <div>
    <h3 className="text-lg font-semibold mb-2 text-blue-700">Uploaded Play Log</h3>
    <table className="min-w-full border text-sm">
      <thead className="bg-blue-600 text-white">
        <tr>
          {Object.keys(playLog[0] || {}).map((key, i) => (
            <th key={i} className="border px-2 py-1 text-left">
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {playLog.map((row, i) => (
          <tr key={i} className="even:bg-blue-50">
            {Object.values(row).map((val, j) => (
              <td key={j} className="border px-2 py-1">
                {val}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PlayTable;
