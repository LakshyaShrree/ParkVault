import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function ProfileScreen() {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const [active, setActive] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [spaces, setSpaces] = useState(0);

  /* 🔥 FETCH DATA */
  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;

      /* 🔥 BOOKINGS QUERY */
      const bookingQuery = query(
        collection(db, "bookings"),
        where(
          userRole === "owner" ? "ownerId" : "userId",
          "==",
          currentUser.uid
        )
      );

      const bookingSnap = await getDocs(bookingQuery);

      let activeCount = 0;
      let completedCount = 0;
      let totalEarnings = 0;

      bookingSnap.forEach((doc) => {
        const data = doc.data();

        if (data.status === "confirmed") {
          activeCount++;
        } else {
          completedCount++;
        }

        // 🔥 earnings only for owner
        if (userRole === "owner") {
          totalEarnings += data.totalPrice || 0;
        }
      });

      setActive(activeCount);
      setCompleted(completedCount);
      setEarnings(totalEarnings);

      /* 🔥 SPACES (ONLY OWNER) */
      if (userRole === "owner") {
        const spaceQuery = query(
          collection(db, "spaces"),
          where("ownerId", "==", currentUser.uid)
        );

        const spaceSnap = await getDocs(spaceQuery);
        setSpaces(spaceSnap.size);
      }
    };

    fetchData();
  }, [currentUser, userRole]);

  /* 🔓 LOGOUT */
  const handleLogout = async () => {
    await logout();
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md p-4 pb-20">

        {/* PROFILE */}
        <div className="bg-white p-4 rounded-xl shadow text-center mb-4">
          <h2 className="text-lg font-semibold">
            {currentUser?.displayName || "User"}
          </h2>
          <p className="text-sm text-gray-500">
            {currentUser?.email}
          </p>
          <p className="text-blue-600 text-sm mt-1">
            {userRole === "owner" ? "Space Owner" : "Vehicle Owner"}
          </p>
        </div>

        {/* VEHICLE OWNER */}
        {userRole === "vehicle" && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <p>Active</p>
              <h3 className="text-green-600 text-xl font-bold">{active}</h3>
            </div>

            <div className="bg-white p-4 rounded-xl shadow text-center">
              <p>Completed</p>
              <h3 className="text-gray-700 text-xl font-bold">{completed}</h3>
            </div>
          </div>
        )}

        {/* SPACE OWNER */}
        {userRole === "owner" && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <p>Bookings</p>
              <h3 className="text-xl font-bold">{active}</h3>
            </div>

            <div className="bg-white p-4 rounded-xl shadow text-center">
              <p>Earnings</p>
              <h3 className="text-blue-600 text-xl font-bold">₹{earnings}</h3>
            </div>

            <div className="bg-white p-4 rounded-xl shadow text-center col-span-2">
              <p>Spaces</p>
              <h3 className="text-xl font-bold">{spaces}</h3>
            </div>
          </div>
        )}

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-3 rounded-xl"
        >
          Logout
        </button>

      </div>

      <BottomNav />
    </div>
  );
}