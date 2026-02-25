type Props = {
  data: Record<string, any>;
};

export default function FormationTendencies({ data }: Props) {
  if (!data || Object.keys(data).length === 0) {
    return <div>No Formation Data</div>;
  }

  return (
    <div>
      <h3>Formations</h3>

      <table>
        <thead>
          <tr>
            <th>Formation</th>
            <th>Run %</th>
            <th>Pass %</th>
            <th>Avg Yds</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(data).map(([formation, f]: any) => (
            <tr key={formation}>
              <td>{formation}</td>
              <td>{f.runPct.toFixed(1)}%</td>
              <td>{f.passPct.toFixed(1)}%</td>
              <td>{f.avgYards.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}