import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/")}
      className="inline-flex items-center rounded-full border border-blue-200 bg-gradient-to-r from-blue-700 to-blue-800 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:from-blue-800 hover:to-blue-900 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      ← Back to Main Dashboard
    </button>
  );
}
