import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 text-center">
      <div>
        <h1 className="text-4xl font-bold text-blue-700 mb-4">404 - Page Not Found</h1>
        <p className="mb-4 text-gray-600">The page you’re looking for doesn’t exist.</p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
