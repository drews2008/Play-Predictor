import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
    >
      ← Back to Dashboard
    </button>
  );
}
