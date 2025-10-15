import React, { useState } from "react";
import  OffensivePlayLogEntry  from "../types/OffensivePlayLogEntry";

interface HeatChartLogicProps {
  playLogs: OffensivePlayLogEntry[];
  fieldWidth?: number;
  fieldHeight?: number;
}

const HeatChartLogic: React.FC<HeatChartLogicProps> = ({
  playLogs,
  fieldWidth = 400,
  fieldHeight = 160,
}) => {
  const [hoveredPlay, setHoveredPlay] = useState<OffensivePlayLogEntry | null>(null);

  // Safe fallback for coordinates
  const getX = (play: OffensivePlayLogEntry) => (typeof play.x === "number" ? play.x : 0);
  const getY = (play: OffensivePlayLogEntry) => (typeof play.y === "number" ? play.y : 0);

  return (
    <div style={{ position: "relative", width: fieldWidth, height: fieldHeight, border: "1px solid #333" }}>
      <svg width={fieldWidth} height={fieldHeight} style={{ display: "block" }}>
        {playLogs.map((play, idx) => (
          <circle
            key={idx}
            cx={getX(play)}
            cy={fieldHeight - getY(play)} // invert Y to match field coord system
            r={4}
            fill={play.playType === "Pass" ? "red" : "blue"}
            stroke="white"
            strokeWidth={0.8}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHoveredPlay(play)}
            onMouseLeave={() => setHoveredPlay(null)}
          />
        ))}
      </svg>

      {/* Tooltip */}
      {hoveredPlay && (
        <div
          style={{
            position: "absolute",
            left: getX(hoveredPlay) + 10,
            top: fieldHeight - getY(hoveredPlay) - 40,
            backgroundColor: "rgba(0,0,0,0.75)",
            color: "white",
            padding: "6px 10px",
            borderRadius: 4,
            pointerEvents: "none",
            maxWidth: 250,
            fontSize: 12,
            zIndex: 10,
          }}
        >
          <div><b>Play:</b> {hoveredPlay.playName || "N/A"}</div>
          <div><b>Formation:</b> {hoveredPlay.formation || "N/A"}</div>
          <div><b>Down & Distance:</b> {hoveredPlay.down ?? "?"} & {hoveredPlay.distance ?? "?"}</div>
          <div><b>Result:</b> {hoveredPlay.resultOfPlay || "N/A"}</div>
          <div><b>Yardage Gained:</b> {hoveredPlay.yardageGained ?? "?"}</div>
        </div>
      )}
    </div>
  );
};

export default HeatChartLogic;
