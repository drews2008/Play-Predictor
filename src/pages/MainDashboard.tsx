// src/pages/MainDashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Main Dashboard</h1>

      <div className="space-y-4">
        <button onClick={() => navigate('/tendencies')} className="bg-blue-500 text-white px-4 py-2 rounded">
          Go to Tendency Dashboard
        </button>

        <button onClick={() => navigate('/draw')} className="bg-green-500 text-white px-4 py-2 rounded">
          Go to Play Drawing Tab
        </button>
      </div>
    </div>
  );
};

export default MainDashboard;
