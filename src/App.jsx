import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import { BookingProvider } from "./context/BookingContext.jsx";

import OnboardingScreen from "./screens/OnboardingScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import SignupScreen from "./screens/SignupScreen.jsx";
import RoleScreen from "./screens/RoleScreen.jsx";
import BrowseScreen from "./screens/BrowseScreen.jsx";
import BookingsScreen from "./screens/BookingsScreen.jsx";
import BookingDetailsScreen from "./screens/BookingDetailsScreen.jsx";
import ListSpaceScreen from "./screens/ListSpaceScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";

import LoadingSpinner from "./components/LoadingSpinner.jsx";
import { useAuth } from "./context/AuthContext.jsx";

/* 🔐 PROTECTED ROUTE */
function ProtectedRoute({ children }) {
  const { currentUser, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}

/* 🚀 APP */
function App() {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    document.title = "ParkVault";
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <BookingProvider>

            <Routes>

              {/* 🌐 DEFAULT */}
              <Route path="/" element={<Navigate to="/onboarding" replace />} />

              {/* 🔓 ONBOARDING */}
              <Route path="/onboarding" element={<OnboardingScreen />} />

              {/* 🔐 AUTH */}
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/signup" element={<SignupScreen />} />

              {/* 👤 ROLE */}
              <Route
                path="/role"
                element={
                  <ProtectedRoute>
                    <RoleScreen />
                  </ProtectedRoute>
                }
              />

              {/* 🚗 BROWSE */}
              <Route
                path="/browse"
                element={
                  <ProtectedRoute>
                    <BrowseScreen
                      refresh={refresh}
                      setRefresh={setRefresh}
                    />
                  </ProtectedRoute>
                }
              />

              {/* 🧾 BOOKING */}
              <Route
                path="/booking/:id"
                element={
                  <ProtectedRoute>
                    <BookingDetailsScreen />
                  </ProtectedRoute>
                }
              />

              {/* 📦 BOOKINGS */}
              <Route
                path="/bookings"
                element={
                  <ProtectedRoute>
                    <BookingsScreen />
                  </ProtectedRoute>
                }
              />

              {/* 🏢 LIST SPACE */}
              <Route
                path="/list-space"
                element={
                  <ProtectedRoute>
                    <ListSpaceScreen />
                  </ProtectedRoute>
                }
              />

              {/* 👤 PROFILE */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />

              {/* ❌ FALLBACK */}
              <Route path="*" element={<Navigate to="/onboarding" replace />} />

            </Routes>

          </BookingProvider>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;