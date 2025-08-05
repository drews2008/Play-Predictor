import React from "react";
import PlayerDraggable from "./PlayerDraggable";
import RouteDrawer from "./RouteDrawer";
import AnimationControls from "./AnimationControls";
import PlaySaver from "./PlaySaver";

const PlayDrawingCanvas: React.FC = () => {
  return (
    <div className="relative w-full h-[600px] bg-green-600 border border-gray-300 rounded-lg">
      {/* Grid or Field Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-500 to-green-700 opacity-20" />

      {/* Players */}
      <PlayerDraggable id="QB" initialPosition={{ x: 100, y: 300 }} />
      <PlayerDraggable id="WR1" initialPosition={{ x: 200, y: 200 }} />
      <PlayerDraggable id="RB" initialPosition={{ x: 150, y: 350 }} />

      {/* Drawing and Controls */}
      <RouteDrawer />
      <AnimationControls />
      <PlaySaver />
    </div>
  );
};

export default PlayDrawingCanvas;
