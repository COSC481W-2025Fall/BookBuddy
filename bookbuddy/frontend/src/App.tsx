import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./login";
import Signup from "./signup";
import Search from "./Search";
import Library from "./Library";

// Main application component with routing
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/library" element={<Library />} />
      </Route>
    </Routes>
  );
}
