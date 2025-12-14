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
import ProtectedRoutes from "./ProtectedRoutes";

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

          <Route element={<ProtectedRoutes />}>
              {/* Routes inside Layout */}
              <Route element={<Layout />}>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/WishBook" element={<WishList />} />
                  <Route path="/Buddy_Recommendation" element={<Buddy />} />
              </Route>
          </Route>
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
