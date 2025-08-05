import React from "react";
import { PlayLogEntry } from "../../types/PlayLogEntry";

interface Props {
  playLogs: PlayLogEntry[];
}

const PlayTable: React.FC<Props> = ({ playLogs }) => {
  return (
    <div>
      <h2>Play Table</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Down</th>
            <th>Distance</th>
            <th>Play Type</th>
            <th>Play Name</th>
            <th>Result</th>
            <th>Yards Gained</th>
            <th>Field Position</th>
            <th>Ball Placement</th>
          </tr>
        </thead>
        <tbody>
          {playLogs.map((play, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #ccc" }}>
              <td>{play.down}</td>
              <td>{play.distance}</td>
              <td>{play.playType}</td>
              <td>{play.playName}</td>
              <td>{play.resultOfPlay}</td>
              <td>{play.yardageGained}</td>
              <td>{play.fieldPosition}</td>
              <td>{play.ballPlacement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayTable;
