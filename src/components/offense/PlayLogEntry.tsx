// src/components/TendencyDashboard/PlayLogEntry.tsx
import React from 'react';
import { PlayLogEntry } from '../../types/PlayLogEntry';

interface Props {
  entry: PlayLogEntry;
}

const PlayLogEntryComponent: React.FC<Props> = ({ entry }) => {
  return (
    <tr>
      <td>{entry.down}</td>
      <td>{entry.distance}</td>
      <td>{entry.fieldPosition}</td>
      <td>{entry.ballPlacement}</td>
      <td>{entry.play}</td>
      <td>{entry.formation}</td>
      <td>{entry.playName}</td>
      <td>{entry.resultOfPlay}</td>
      <td>{entry.yardageGained}</td>
    </tr>
  );
};

export default PlayLogEntryComponent;
