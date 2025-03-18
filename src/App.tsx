import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import routes from "tempo-routes";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import PropertyListingPage from "./pages/PropertyListingPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import PropertyDetailPageEnhanced from "./pages/PropertyDetailPageEnhanced";
import MapPage from "./pages/MapPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import FavoritesPage from "./pages/FavoritesPage";
import BuyPage from "./pages/BuyPage";
import RentPage from "./pages/RentPage";
import SettingsPage from "./pages/SettingsPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        }
      >
        <>
          {/* For the tempo routes */}
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/properties" element={<PropertyListingPage />} />
              <Route
                path="/property/:id"
                element={<PropertyDetailPageEnhanced />}
              />
              <Route path="/map" element={<MapPage />} />
              <Route path="/buy" element={<BuyPage />} />
              <Route path="/rent" element={<RentPage />} />
              <Route path="/sell" element={<HomePage />} />
              <Route path="/about" element={<HomePage />} />
              <Route path="/contact" element={<HomePage />} />

              {/* Authentication routes */}
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />

              {/* Protected routes */}
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <FavoritesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />

              {/* Add this before the catchall route */}
              {import.meta.env.VITE_TEMPO === "true" && (
                <Route path="/tempobook/*" />
              )}

              {/* Catchall route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
          <Toaster />
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
