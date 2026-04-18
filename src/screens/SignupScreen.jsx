import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignupScreen() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // ✅ IMPORTANT: only email & password
      await signup(email, password);

      // 🔥 after signup → go to role selection
      navigate("/role");

    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-app flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-md">

        <h2 className="text-2xl font-bold mb-2">Create account</h2>
        <p className="text-sm text-gray-500 mb-6">
          Sign up to list or book parking spaces.
        </p>

        {/* NAME */}
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-gray-100 outline-none"
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-gray-100 outline-none"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-gray-100 outline-none"
        />

        {/* CONFIRM PASSWORD */}
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-6 p-3 rounded-lg bg-gray-100 outline-none"
        />

        {/* BUTTON */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Creating..." : "Create account"}
        </button>

        {/* LOGIN */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}