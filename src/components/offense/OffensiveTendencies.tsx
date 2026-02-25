import { OffensivePlayLogEntry } from "../../types/OffensivePlayLogEntry";
import { buildOffensiveDashboard } from "../../engine/tendencyEngine";

import FormationTendencies from "./FormationTendencies";
import SituationalTendencies from "./SituationalTendencies";
import ConceptBreakdown from "./ConceptBreakdown";

type Props = {
  playLog: OffensivePlayLogEntry[];
};

export default function OffensiveDashboard({ playLog }: Props) {
  const data = buildOffensiveDashboard(playLog);

  if (!playLog || playLog.length === 0) {
    return <div>No Data</div>;
  }

  return (
    <div>
      <h2>Offensive Tendency Dashboard</h2>

      <FormationTendencies data={data.formations} />
      <SituationalTendencies data={data.situations} />
      <ConceptBreakdown data={data.concepts} />
    </div>
  );
}