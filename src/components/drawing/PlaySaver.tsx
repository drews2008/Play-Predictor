import React from "react";

const PlaySaver: React.FC = () => {
  const handleSave = () => {
    alert("Play saved! (This should be replaced with real storage logic)");
  };

  return (
    <div className="absolute bottom-2 right-2 bg-white p-2 rounded shadow">
      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm"
      >
        Save Play
      </button>
    </div>
  );
};

export default PlaySaver;
