import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-8">
      <h1 className="text-4xl font-bold mb-6">PlayPredictor Dashboard</h1>
      <p className="text-lg mb-10 text-gray-700">Choose a tool below to get started:</p>
      <div className="space-y-4">
        <Link to="/tendency" className="block px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
          Offensive Tendencies
        </Link>
        <Link to="/playdrawing" className="block px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700">
          Play Drawing Board
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
