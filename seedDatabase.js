import { db } from "./src/firebase/config.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

async function seedSpaces() {
  const spaces = [
    {
      title: "New Colony Chrompet",
      address: "New Colony, Chrompet, Chennai",
      area: "1200 sq ft",
      maxHeight: "7",
      slots: 5,
      availableSlots: 5,
      pricePerHour: 150,
      tier: "premium",
      vehicleTypes: ["car", "suv"],
      ownerId: "seed-owner",
      ownerName: "ParkVault Owner",
      photos: [],
      rating: 4.8,
      totalBookings: 0,
      createdAt: serverTimestamp(),
      isActive: true,
    },
    {
      title: "KK Nagar",
      address: "KK Nagar, Chennai",
      area: "850 sq ft",
      maxHeight: "6",
      slots: 8,
      availableSlots: 8,
      pricePerHour: 80,
      tier: "standard",
      vehicleTypes: ["two-wheeler", "car"],
      ownerId: "seed-owner",
      ownerName: "ParkVault Owner",
      photos: [],
      rating: 4.5,
      totalBookings: 0,
      createdAt: serverTimestamp(),
      isActive: true,
    },
    {
      title: "Housing Board Colony Chrompet",
      address: "Housing Board Colony, Chrompet, Chennai",
      area: "1400 sq ft",
      maxHeight: "8",
      slots: 12,
      availableSlots: 12,
      pricePerHour: 120,
      tier: "standard",
      vehicleTypes: ["car", "suv", "van"],
      ownerId: "seed-owner",
      ownerName: "ParkVault Owner",
      photos: [],
      rating: 4.3,
      totalBookings: 0,
      createdAt: serverTimestamp(),
      isActive: true,
    },
  ];

  try {
    for (const space of spaces) {
      const docRef = await addDoc(collection(db, "spaces"), space);
      console.log("Added:", space.title, "ID:", docRef.id);
    }

    console.log("🎉 Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
  }
}

seedSpaces();