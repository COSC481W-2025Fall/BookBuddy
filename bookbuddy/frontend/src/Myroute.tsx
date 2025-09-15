import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import Search from "./Search";  // ✅ make sure this file exists
import App from "./App";

export default function Myroute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
         <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}
