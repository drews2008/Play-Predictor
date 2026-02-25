type Props = {
  data: Record<string, any>;
};
const HASHES = ["Left", "Middle", "Right"];

const BASE_ORDER = [
  "1st & 10",

  "2nd & 1-3",
  "2nd & 4-7",
  "2nd & 8+",

  "3rd & 1-3",
  "3rd & 4-7",
  "3rd & 8+",

  "4th & 1-3",
  "4th & 4-7",
  "4th & 8+",

  "Goal-To-Go",
  "2PT",
];

const ORDER = BASE_ORDER.flatMap(situation =>
  HASHES.map(hash => `${situation} (${hash})`)
);
export default function SituationalTendencies({ data }: Props) {
  if (!data || Object.keys(data).length === 0) {
    return <div>No Situation Data</div>;
  }

  return (
    <div>
      <h3>Situational Tendencies</h3>

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
          {ORDER.map((key) => {
            const s = data[key];

            if (!s) return null;

            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{s.runPct.toFixed(1)}%</td>
                <td>{s.passPct.toFixed(1)}%</td>
                <td>{s.avgYards.toFixed(1)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}