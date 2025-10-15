import React from 'react';
import { usePlayContext } from '../../context/PlayContext';
import { uploadPlayLog } from '../../services/playlogServices';
import type { DefensivePlayLogEntry } from '../../types/DefensivePlayLogEntry';

const DefensivePlayUploader = () => {
  const playContext = usePlayContext();
  if (!playContext) throw new Error('PlayContext not found');
  const { setDefensivePlays } = playContext;

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const parsed = await uploadPlayLog(file, 'defense');
    if (Array.isArray(parsed) && parsed.length > 0 && 'defensiveCall' in parsed[0]) {
      setDefensivePlays(parsed as DefensivePlayLogEntry[]);
    } else {
      setDefensivePlays([]);
    }
  };

  return (
    <div>
      <label>Upload Defensive Play Log</label>
      <input type="file" accept=".csv" onChange={handleUpload} />
    </div>
  );
};

export default DefensivePlayUploader;
