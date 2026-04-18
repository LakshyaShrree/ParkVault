import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import BottomNav from "../components/BottomNav";

export default function ListSpaceScreen() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [slots, setSlots] = useState("");
  const [price, setPrice] = useState("");
  const [tier, setTier] = useState("standard");

  const [loading, setLoading] = useState(false);

  /* 🔥 SUBMIT */
  const handleSubmit = async () => {
    if (!title || !address || !price || !slots) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "spaces"), {
        title,
        address,
        area: Number(area || 0),
        availableSlots: Number(slots),
        pricePerHour: Number(price),
        tier,
        ownerId: currentUser.uid, // 🔥 CRITICAL FIX
        rating: 4.5,
        createdAt: serverTimestamp()
      });

      alert("✅ Space Listed Successfully");

      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Error listing space");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md p-4 pb-20">

        {/* TITLE */}
        <h2 className="text-lg font-semibold mb-3">
          List Your Parking Space
        </h2>

        {/* FORM */}
        <div className="bg-white p-4 rounded-xl shadow flex flex-col gap-3">

          <input
            placeholder="Space title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            placeholder="Area (sqft)"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            placeholder="Available slots"
            value={slots}
            onChange={(e) => setSlots(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            placeholder="Price per hour"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded"
          />

          {/* TIER */}
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded-lg"
          >
            {loading ? "Listing..." : "List Space"}
          </button>

        </div>

      </div>

      {/* 🔥 BOTTOM NAV */}
      <BottomNav />
    </div>
  );
}