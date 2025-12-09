import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./login";
import Signup from "./signup";
import Search from "./Search";
import Library from "./Library";
import WishList from "./WishBook";
import Buddy from "./Buddy_Recommendation";
import Profile from "./Profile";

// Protect pages from being accessed without login
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const accountId = localStorage.getItem("accountId");

  // If not logged in, redirect to signup ("/")
  if (!accountId) return <Navigate to="/" replace />;

  return children;
}

export default function App() {
  const location = useLocation();

  return (
    // key={location.pathname} forces this wrapper to remount on every route change,
    // so the CSS animation runs each time.
    <div key={location.pathname} className="page-fade">
      <Routes location={location}>
        {/* Public routes */}
        <Route path="/" element={<Signup />} />
        {/*<Route path="/login" element={<Login />} />*/}
        {/*<Route path="/signup" element={<Signup />} />*/}

        {/* Protected routes inside Layout */}
        <Route element={<Layout />}>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />
          <Route
            path="/library"
            element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            }
          />
          <Route
            path="/WishList"
            element={
              <ProtectedRoute>
                <WishList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Buddy_Recommendation"
            element={
              <ProtectedRoute>
                <Buddy />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
