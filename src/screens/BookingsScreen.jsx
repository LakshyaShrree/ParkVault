import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import BottomNav from "../components/BottomNav";

export default function BookingsScreen() {
  const { currentUser } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("active");

  /* 🔥 FETCH BOOKINGS */
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "bookings"),
      where("userId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setBookings(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  /* 🔥 FILTER */
  const filtered = bookings.filter((b) =>
    tab === "active" ? b.status === "confirmed" : b.status !== "confirmed"
  );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-gray-100 p-4 pb-20">

        {/* HEADER */}
        <div className="bg-white rounded-2xl p-4 shadow mb-4">
          <h2 className="text-lg font-semibold">My Bookings</h2>

          {/* TABS */}
          <div className="flex mt-3 bg-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => setTab("active")}
              className={`flex-1 py-2 text-sm ${
                tab === "active"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600"
              }`}
            >
              Active ({bookings.filter(b => b.status === "confirmed").length})
            </button>

            <button
              onClick={() => setTab("past")}
              className={`flex-1 py-2 text-sm ${
                tab === "past"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600"
              }`}
            >
              Past ({bookings.filter(b => b.status !== "confirmed").length})
            </button>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500">No bookings yet</p>
        ) : (
          <div className="space-y-3">

            {filtered.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl p-3 shadow flex items-center justify-between"
              >

                {/* LEFT */}
                <div className="flex gap-3 items-center">

                  {/* IMAGE */}
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                    📷
                  </div>

                  {/* DETAILS */}
                  <div>
                    <h3 className="text-sm font-semibold">
                      {booking.spaceTitle}
                    </h3>

                    <p className="text-xs text-gray-500">
                      {booking.address}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      ⏱ {booking.hours || 1} hr
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-right">

                  <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                    Confirmed
                  </span>

                  <p className="text-blue-600 font-semibold text-sm mt-2">
                    ₹{booking.totalPrice || booking.pricePerHour}
                  </p>

                </div>

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