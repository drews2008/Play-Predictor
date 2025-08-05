import React from "react";

const AnimationControls: React.FC = () => {
  const handlePlay = () => {
    alert("Animating routes... (to be implemented)");
  };

  return (
    <div className="absolute bottom-2 left-2 bg-white p-2 rounded shadow">
      <button
        onClick={handlePlay}
        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
      >
        Animate Routes
      </button>
    </div>
  );
};

export default AnimationControls;
