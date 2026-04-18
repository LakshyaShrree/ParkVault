import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function BrowseScreen() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 🔥 FETCH SPACES */
  useEffect(() => {
    if (!currentUser) return;

    const q = query(collection(db, "spaces"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setSpaces(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-gray-100 p-4 pb-20">

        {/* HEADER */}
        <div className="bg-blue-600 text-white p-4 rounded-2xl shadow mb-4">
          <h2 className="text-lg font-semibold">Find Parking</h2>
          <p className="text-xs opacity-80">
            live parking availability near you
          </p>
        </div>

        {/* MAP BOX */}
        <div className="bg-gray-200 rounded-2xl h-32 flex flex-col items-center justify-center mb-4">
          <span className="text-gray-500 text-sm">🗺️ Map View</span>
          <span className="text-xs text-gray-400">
            {spaces.length} parking spaces found
          </span>
        </div>

        {/* TITLE */}
        <h3 className="text-sm font-semibold mb-2">
          Available Spaces
        </h3>

        {/* LOADING */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : spaces.length === 0 ? (
          <p className="text-center text-gray-500">
            No spaces available
          </p>
        ) : (
          <div className="space-y-3">

            {spaces.map((space) => (
              <div
                key={space.id}
                className="bg-white rounded-2xl p-3 shadow"
              >

                {/* IMAGE */}
                <div className="w-full h-20 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                  📷
                </div>

                {/* TITLE + TAG */}
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold">
                    {space.title}
                  </h3>

                  <span className={`text-xs px-2 py-1 rounded-full ${
                    space.tier === "premium"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-blue-100 text-blue-600"
                  }`}>
                    {space.tier || "standard"}
                  </span>
                </div>

                {/* ADDRESS */}
                <p className="text-xs text-gray-500">
                  {space.address}
                </p>

                {/* DETAILS */}
                <div className="flex justify-between items-center mt-2 text-xs">

                  <span className="text-yellow-500">
                    ⭐ {space.rating || 4.5}
                  </span>

                  <span className="text-gray-600">
                    🅿 {space.availableSlots || space.slots || 0}
                  </span>

                  <span className="text-blue-600 font-semibold">
                    ₹{space.pricePerHour}/hr
                  </span>

                </div>

                {/* BUTTON */}
                <button
                  onClick={() => navigate(`/booking/${space.id}`)}
                  className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg text-sm"
                >
                  Book Now
                </button>

              </div>
            ))}

          </div>
        )}
      </div>

      {/* 🔥 BOTTOM NAV */}
      <BottomNav />
    </div>
  );
}