import React, { useState, useMemo } from "react";
import OffensivePlayUploader from "../playlog/OffensivePlayUploader";
import { OffensivePlayLogEntry } from "../../types/OffensivePlayLogEntry";
import { tendencyService } from "../../services/tendencyService";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const OffensiveTendencies: React.FC = () => {
  const [playLog, setPlayLog] = useState<OffensivePlayLogEntry[]>([]);
  const [activeTab, setActiveTab] = useState<"formation" | "situational" | "playtable">("formation");

  // ✅ Receives parsed data from uploader
  const handlePlaysParsed = (parsedPlays: OffensivePlayLogEntry[]) => {
    setPlayLog(parsedPlays);
  };

  // ⚡ Compute tendencies using useMemo so it updates only when playLog changes
  const formationTendencies = useMemo(
    () => tendencyService.getFormationTendencies(playLog),
    [playLog]
  );

  const situationalTendencies = useMemo(
    () => tendencyService.getSituationalTendencies(playLog),
    [playLog]
  );

  // Pie chart for overall run/pass
  const runPassTotals = useMemo(() => {
    const total = { run: 0, pass: 0 };
    playLog.forEach(p => {
      if (p.type === "Run") total.run++;
      else if (p.type === "Pass") total.pass++;
    });
    return total;
  }, [playLog]);

  const renderPie = () => (
    <Pie
      data={{
        labels: ["Run", "Pass"],
        datasets: [{ data: [runPassTotals.run, runPassTotals.pass], backgroundColor: ["#3b82f6", "#ef4444"] }],
      }}
      options={{ plugins: { legend: { position: "bottom" as const } } }}
    />
  );

  const renderFormation = () => (
    <div>
      {renderPie()}
      <div className="overflow-x-auto mt-4">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border px-2 py-1">Formation</th>
              <th className="border px-2 py-1">Run %</th>
              <th className="border px-2 py-1">Pass %</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(formationTendencies).map(([formation, data]) => (
              <tr key={formation}>
                <td className="border px-2 py-1">{formation}</td>
                <td className="border px-2 py-1">{data.run}%</td>
                <td className="border px-2 py-1">{data.pass}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSituational = () => (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border px-2 py-1">Situation</th>
            <th className="border px-2 py-1">Run %</th>
            <th className="border px-2 py-1">Pass %</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(situationalTendencies).map(([situation, data]) => (
            <tr key={situation}>
              <td className="border px-2 py-1">{situation}</td>
              <td className="border px-2 py-1">{data.run}%</td>
              <td className="border px-2 py-1">{data.pass}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPlayTable = () => (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            {playLog.length > 0 &&
              Object.keys(playLog[0]).map((key) => (
                <th key={key} className="border px-2 py-1">{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {playLog.map((play, idx) => (
            <tr key={idx}>
              {Object.values(play).map((value, idy) => (
                <td key={idy} className="border px-2 py-1">{value?.toString() || "-"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Offensive Tendencies</h2>

      {/* File uploader */}
      <OffensivePlayUploader onDataProcessed={handlePlaysParsed} />

      {/* Tabs */}
      <div className="flex border-b border-gray-300 mt-4 mb-2">
        {["formation", "situational", "playtable"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 -mb-px border-b-2 ${
              activeTab === tab ? "border-blue-500 font-bold" : "border-transparent"
            }`}
            onClick={() => setActiveTab(tab as "formation" | "situational" | "playtable")}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-4">
        {activeTab === "formation" && renderFormation()}
        {activeTab === "situational" && renderSituational()}
        {activeTab === "playtable" && renderPlayTable()}
      </div>
    </div>
  );
};

export default OffensiveTendencies;
