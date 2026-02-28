// src/pages/PlayDrawingTab.tsx
import React from 'react';
import BackButton from "../components/ui/Button";

const PlayDrawingPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-4">
        <BackButton />
      </div>
      <h1 className="text-2xl font-bold mb-4">Play Drawing Page</h1>
      <p>This is where users can draw and visualize football plays.</p>

      {/* You’ll want to put your drawing canvas or tools here later */}
    </div>
  );
};

export default PlayDrawingPage;
