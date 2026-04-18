import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole } = useAuth();

  const vehicleNav = [
    { label: "Browse", path: "/browse" },
    { label: "Bookings", path: "/bookings" },
    { label: "Profile", path: "/profile" }
  ];

  const ownerNav = [
    { label: "Bookings", path: "/bookings" },
    { label: "List Space", path: "/list-space" },
    { label: "Profile", path: "/profile" }
  ];

  const navItems = userRole === "owner" ? ownerNav : vehicleNav;

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t shadow flex justify-around py-2 z-50">

      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center text-xs ${
            location.pathname === item.path
              ? "text-blue-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          {item.label}
        </button>
      ))}

    </div>
  );
}