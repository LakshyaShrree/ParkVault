import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleScreen() {
  const navigate = useNavigate();
  const { setUserRole } = useAuth(); // ✅ must exist in AuthContext

  const handleSelect = async (role) => {
    try {
      await setUserRole(role); // save role in firestore
      navigate(role === "vehicle" ? "/browse" : "/list-space");
    } catch (err) {
      console.error(err);
      alert("Failed to set role");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow">

        <h2 className="text-xl font-semibold text-center mb-6">
          Select Role
        </h2>

        {/* VEHICLE OWNER */}
        <button
          onClick={() => handleSelect("vehicle")}
          className="w-full bg-blue-600 text-white py-3 rounded-xl mb-4"
        >
          Vehicle Owner
        </button>

        {/* SPACE OWNER */}
        <button
          onClick={() => handleSelect("owner")}
          className="w-full bg-green-600 text-white py-3 rounded-xl"
        >
          Space Owner
        </button>

      </div>
    </div>
  );
}