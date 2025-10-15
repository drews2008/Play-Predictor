import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface FormationProps {
  tendencies: {
    formation: string;
    runPct: number;
    passPct: number;
    topPlays: string[];
  }[];
}

const FormationTendencies: React.FC<FormationProps> = ({ tendencies }) => {
  const pieData = {
    labels: tendencies.map(t => t.formation),
    datasets: [
      {
        label: "Run %",
        data: tendencies.map(t => t.runPct),
        backgroundColor: tendencies.map(() => `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 0.5)`),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h3>Formation Tendencies</h3>
      <Pie data={pieData} />
      <table>
        <thead>
          <tr>
            <th>Formation</th>
            <th>Run %</th>
            <th>Pass %</th>
            <th>Top Plays</th>
          </tr>
        </thead>
        <tbody>
          {tendencies.map((t, i) => (
            <tr key={i}>
              <td>{t.formation}</td>
              <td>{t.runPct.toFixed(1)}%</td>
              <td>{t.passPct.toFixed(1)}%</td>
              <td>{t.topPlays.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormationTendencies;
