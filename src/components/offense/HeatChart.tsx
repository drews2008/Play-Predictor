import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { OffensivePlayLogEntry } from "../../types/OffensivePlayLogEntry";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Props {
  playLog: OffensivePlayLogEntry[];
}

const HeatChart: React.FC<Props> = ({ playLog }) => {
  // Group by hash + field zone
  const grouped = playLog.reduce((acc, play) => {
    const zone = `${play.ballPlacement}-${Math.floor((play.fieldPosition || 0) / 10) * 10}`;
    if (!acc[zone]) acc[zone] = { runs: 0, passes: 0 };
    play.type === "Run" ? acc[zone].runs++ : acc[zone].passes++;
    return acc;
  }, {} as Record<string, { runs: number; passes: number }>);

  const labels = Object.keys(grouped);
  const runData = labels.map(l => {
    const val = grouped[l];
    const total = val.runs + val.passes;
    return total > 0 ? (val.runs / total) * 100 : 0;
  });
  const passData = labels.map(l => {
    const val = grouped[l];
    const total = val.runs + val.passes;
    return total > 0 ? (val.passes / total) * 100 : 0;
  });

  const data = {
    labels,
    datasets: [
      { label: "Run %", data: runData, backgroundColor: "rgba(54, 162, 235, 0.6)" },
      { label: "Pass %", data: passData, backgroundColor: "rgba(255, 99, 132, 0.6)" },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Hash & Field Zone Tendencies</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default HeatChart;
