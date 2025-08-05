import React, { useState } from "react";

interface Props {
  id: string;
  initialPosition: { x: number; y: number };
}

const PlayerDraggable: React.FC<Props> = ({ id, initialPosition }) => {
  const [position, setPosition] = useState(initialPosition);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    const x = e.clientX - 25;
    const y = e.clientY - 25;
    setPosition({ x, y });
  };

  return (
    <div
      draggable
      onDragEnd={handleDrag}
      className="absolute w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-move"
      style={{ left: position.x, top: position.y }}
    >
      {id}
    </div>
  );
};

export default PlayerDraggable;
