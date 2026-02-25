type Props = {
  data: Record<string, any>;
};

export default function ConceptBreakdown({ data }: Props) {
  if (!data || Object.keys(data).length === 0) {
    return <div>No Concept Data</div>;
  }

  return (
    <div>
      <h3>Concepts</h3>

      <table>
        <thead>
          <tr>
            <th>Concept</th>
            <th>Total</th>
            <th>Avg Yds</th>
            <th>Top Situations</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(data).map(([concept, c]: any) => (
            <tr key={concept}>
              <td>{concept}</td>
              <td>{c.total}</td>
              <td>{c.avgYards.toFixed(1)}</td>
              <td>
                {c.topSituations
                  ?.map((s: any) => `${s[0]} (${s[1]})`)
                  .join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}