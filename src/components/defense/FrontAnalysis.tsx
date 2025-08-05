import Charts from "../ui/Charts"
export interface FrontAnalysisProps {
  data: {
    frontName: string;
    usagePercent: number;
    runStopRate?: number;
    passRushRate?: number;
    notes?: string;
  }[];
}

const FrontAnalysis: React.FC<FrontAnalysisProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-gray-500 italic">No front analysis data available.</div>;
  }

  const barData = data.map((item) => ({
    front: item.frontName,
    usage: item.usagePercent,
  }));

  return (
    <div className="front-analysis grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Bar Chart */}
      <div>
        <Charts
          type="bar"
          title="Front Usage %"
          data={barData}
          xKey="front"
          yKeys={[{ key: 'usage', label: 'Usage %', color: '#3b82f6' }]}
          height={300}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <h3 className="text-lg font-semibold mb-2">Front Breakdown Table</h3>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Defensive Front</th>
              <th className="px-4 py-2 text-right">Usage %</th>
              <th className="px-4 py-2 text-right">Run Stop %</th>
              <th className="px-4 py-2 text-right">Pass Rush %</th>
              <th className="px-4 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              ({ frontName, usagePercent, runStopRate, passRushRate, notes }, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-4 py-2">{frontName}</td>
                  <td className="px-4 py-2 text-right">
                    {usagePercent.toFixed(1)}%
                  </td>
                  <td className="px-4 py-2 text-right">
                    {runStopRate !== undefined ? `${runStopRate.toFixed(1)}%` : 'N/A'}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {passRushRate !== undefined ? `${passRushRate.toFixed(1)}%` : 'N/A'}
                  </td>
                  <td className="px-4 py-2">{notes || <span className="text-gray-400">–</span>}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FrontAnalysis;
