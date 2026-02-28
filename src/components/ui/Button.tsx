import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 border border-blue-500"
    >
      ← Back to Dashboard
    </button>
  );
}
