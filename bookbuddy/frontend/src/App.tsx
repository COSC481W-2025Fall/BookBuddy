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

export default function App() {
  const location = useLocation();

  return (
    // key={location.pathname} forces this wrapper to remount on every route change,
    // so the CSS animation runs each time.
    <div key={location.pathname} className="page-fade">
      <Routes location={location}>
        {/* public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* routes that use the sidebar layout */}
        <Route element={<Layout />}>
          <Route path="/search" element={<Search />} />
          <Route path="/library" element={<Library />} />
          <Route path="/WishList" element={<WishList />} />
          <Route path="/Buddy_Recommendation" element={<Buddy />} />
          <Route path="/Profile" element={<Profile />} />
        </Route>

        {/* catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}
