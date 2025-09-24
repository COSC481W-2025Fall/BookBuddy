import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";   // <- your sidebar component

export default function Layout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}