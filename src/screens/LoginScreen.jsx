import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email & password");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate("/browse"); // ✅ after login
    } catch (err) {
      console.error(err);
      alert("Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-app flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-md">

        <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
        <p className="text-sm text-gray-500 mb-6">
          Login with your email and password.
        </p>

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
          className="w-full mb-6 p-3 rounded-lg bg-gray-100 outline-none"
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {/* SIGNUP */}
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
}