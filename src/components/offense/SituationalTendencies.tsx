type SituationStat = {
  runPct: number;
  passPct: number;
  avgYards: number;
};

type SituationGroup = Record<string, SituationStat>;

type Props = {
  data: {
    standard: SituationGroup;
    goalToGo: SituationGroup;
    twoPoint: SituationGroup;
  };
};

function renderTable(title: string, group: SituationGroup) {
  if (!group || Object.keys(group).length === 0) return null;

  return (
    <div style={{ marginBottom: "20px" }}>
      <h4>{title}</h4>

      <table>
        <thead>
          <tr>
            <th>Situation</th>
            <th>Run %</th>
            <th>Pass %</th>
            <th>Avg Yds</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(group).map(([key, s]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{s.runPct.toFixed(1)}%</td>
              <td>{s.passPct.toFixed(1)}%</td>
              <td>{s.avgYards.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SituationalTendencies({ data }: Props) {
  if (!data) return <div>No Situation Data</div>;

  return (
    <div>
      <h3>Situational Tendencies</h3>

      {/* STANDARD */}
      {renderTable("Standard Situations", data.standard)}

      {/* GOAL TO GO */}
      {renderTable("Goal-To-Go", data.goalToGo)}

      {/* 2 POINT */}
      {renderTable("2-Point", data.twoPoint)}
    </div>
  );
}