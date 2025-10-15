import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface SituationalProps {
  downDist: any[];
  hash: any[];
  field: any[];
  firstPlay: any[];
}

const SituationalTendencies: React.FC<SituationalProps> = ({ downDist, hash, field, firstPlay }) => {
  const barData = {
    labels: downDist.map(d => d.downDistance),
    datasets: [
      {
        label: "Run %",
        data: downDist.map(d => d.runPct),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Pass %",
        data: downDist.map(d => d.passPct),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
  };

  return (
    <div>
      <h3>Situational Tendencies</h3>

      <h4>Down & Distance</h4>
      <Bar data={barData} options={barOptions} />

      {/* Repeat for Hash, Field, First Play with similar bar charts */}
      {/* Example for Hash */}
      <h4>Hash</h4>
      <Bar
        data={{
          labels: hash.map(h => h.hash),
          datasets: [
            { label: "Run %", data: hash.map(h => h.runPct), backgroundColor: "rgba(54, 162, 235, 0.6)" },
            { label: "Pass %", data: hash.map(h => h.passPct), backgroundColor: "rgba(255, 99, 132, 0.6)" },
          ],
        }}
        options={barOptions}
      />
    </div>
  );
};

export default SituationalTendencies;
