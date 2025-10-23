import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import Search from "./Search";
import App from "./App";
import Library from "./Library";
import Buddy from "./Buddy_Recommendation";

export default function Myroute() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/search" element={<Search />} />
      <Route path="/app" element={<App />} />
      <Route path="/library" element={<Library />} />
      <Route path="/Buddy_Recommendation" element ={<Buddy />} />
    </Routes>
  )
}
