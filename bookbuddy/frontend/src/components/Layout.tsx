import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";   // <- your sidebar component
import "./Sidebar.css";

// Layout component that adds the sidebar and whatever other page it is trying to show
export default function Layout() {
  return (
    <div className="bb-layout">
      <Sidebar />
      <main className="bb-main" id="main" tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  );
}