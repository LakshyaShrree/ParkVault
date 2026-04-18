import { useNavigate } from "react-router-dom";

export default function SpaceCard({ space }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md mb-4">

      {/* IMAGE */}
      <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-3">
        📷
      </div>

      {/* TITLE + TIER */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">
          {space.title}
        </h3>

        <span
          className={`text-xs px-2 py-1 rounded-full ${
            space.tier === "premium"
              ? "bg-orange-100 text-orange-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {space.tier || "standard"}
        </span>
      </div>

      {/* ADDRESS */}
      <p className="text-sm text-gray-500">
        {space.address}
      </p>

      {/* DETAILS */}
      <div className="flex justify-between items-center mt-2 text-sm">

        <span>⭐ {space.rating || 4.5}</span>

        <span>🅿 {space.availableSlots || 0}</span>

        <span className="text-blue-600 font-semibold">
          ₹{space.pricePerHour}/hr
        </span>

      </div>

      {/* 🔥 BOOK BUTTON (FIXED) */}
      <button
        onClick={() => navigate(`/booking/${space.id}`)} // ✅ CORRECT
        className="w-full mt-3 bg-blue-600 text-white py-2 rounded-xl"
      >
        Book Now
      </button>

    </div>
  );
}