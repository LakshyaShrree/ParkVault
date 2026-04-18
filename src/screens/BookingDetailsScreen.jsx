import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  updateDoc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import BottomNav from "../components/BottomNav";

export default function BookingDetailsScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [space, setSpace] = useState(null);
  const [hours, setHours] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [payment, setPayment] = useState("upi");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false); // ✅ NEW

  /* FETCH SPACE */
  useEffect(() => {
    const fetchSpace = async () => {
      const docRef = doc(db, "spaces", id);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const data = snap.data();
        setSpace({ id: snap.id, ...data });
        setTotalPrice(data.pricePerHour);
      }

      setLoading(false);
    };

    fetchSpace();
  }, [id]);

  /* PRICE CALC */
  useEffect(() => {
    if (space) {
      setTotalPrice(hours * space.pricePerHour);
    }
  }, [hours, space]);

  /* BOOKING */
  const handleBooking = async () => {
    if (!space) return;

    if (space.availableSlots <= 0) {
      alert("No slots available");
      return;
    }

    setProcessing(true);

    try {
      await addDoc(collection(db, "bookings"), {
        spaceId: space.id,
        spaceTitle: space.title,
        address: space.address,
        pricePerHour: space.pricePerHour,
        totalPrice,
        hours,
        paymentMethod: payment,
        userId: currentUser.uid,
        ownerId: space.ownerId,
        status: "confirmed",
        createdAt: serverTimestamp()
      });

      await updateDoc(doc(db, "spaces", space.id), {
        availableSlots: space.availableSlots - 1
      });

      setSuccess(true); // ✅ show confirmation UI
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }

    setProcessing(false);
  };

  /* SUCCESS SCREEN */
  if (success) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-xl font-semibold mb-2">
          ✅ Payment Successful
        </h2>
        <p className="text-gray-500 mb-4">
          Your parking is confirmed
        </p>

        <button
          onClick={() => navigate("/bookings")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          View Bookings
        </button>
      </div>
    );
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!space) return <p className="text-center mt-10">Not found</p>;

  return (
    <div className="p-4 pb-20">

      <h2 className="text-lg font-semibold mb-3">
        Book {space.title}
      </h2>

      <div className="bg-white p-4 rounded shadow mb-3">
        <p>{space.address}</p>
        <p>₹{space.pricePerHour}/hr</p>
        <p>Slots: {space.availableSlots}</p>
      </div>

      <input
        type="number"
        min="1"
        value={hours}
        onChange={(e) => setHours(Number(e.target.value))}
        className="w-full border p-2 rounded mb-3"
      />

      <p className="font-semibold mb-3">
        Total: ₹{totalPrice}
      </p>

      <div className="flex flex-col gap-2 mb-4">
        <button onClick={() => setPayment("upi")}>UPI</button>
        <button onClick={() => setPayment("card")}>Card</button>
        <button onClick={() => setPayment("net")}>Net Banking</button>
      </div>

      <button
        onClick={handleBooking}
        disabled={processing}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {processing ? "Processing..." : "Confirm Booking"}
      </button>

      <BottomNav />
    </div>
  );
}