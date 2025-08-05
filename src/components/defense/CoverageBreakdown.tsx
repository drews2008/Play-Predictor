import Charts from '../ui/Charts'; // Adjust if your path differs

interface CoverageData {
  coverageType: string;
  percentage: number;
  description?: string;
}

interface Props {
  data: CoverageData[];
}

const CoverageBreakdown: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-gray-500 italic">No coverage data available.</div>;
  }

  // Prepare data for pie chart
  const pieData = data.map((item) => ({
    name: item.coverageType,
    value: item.percentage,
  }));

  const pieColors = [
    '#3b82f6', // blue
    '#f97316', // orange
    '#22c55e', // green
    '#ef4444', // red
    '#a855f7', // purple
    '#eab308', // yellow
    '#14b8a6', // teal
  ];

  return (
    <div className="coverage-breakdown-container grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
      {/* Pie Chart */}
      <div>
        <Charts
          type="pie"
          title="Coverage Type %"
          data={pieData}
          colors={pieColors}
          height={300}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <h3 className="text-lg font-semibold mb-2">Defensive Coverage Breakdown</h3>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Coverage Type</th>
              <th className="px-4 py-2 text-right">Percentage</th>
              <th className="px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ coverageType, percentage, description }) => (
              <tr key={coverageType} className="border-b">
                <td className="px-4 py-2">{coverageType}</td>
                <td className="px-4 py-2 text-right">{percentage.toFixed(1)}%</td>
                <td className="px-4 py-2">{description || <span className="text-gray-400">–</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoverageBreakdown;
