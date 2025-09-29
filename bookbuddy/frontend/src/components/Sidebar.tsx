import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

// Sidebar component with navigation links
export default function Sidebar() {
  // State to manage sidebar visibility if wanted
  const [open, setOpen] = useState<boolean>(false);

  //Defines the navigation links, can be added to later
  const links: { to: string; label: string }[] = [
    { to: "/", label: "Home" },
    { to: "/search", label: "Search" },
    { to: "/library", label: "Library" },
    { to: "/login", label: "Sign Out" },
  ];

  // Render the sidebar with navigation links
  return (
    <>
    {/* // Button to toggle sidebar visibility */}
      <button
        className="bb-sidebar_toggle"
        aria-label="Toggle navigation"
        onClick={() => setOpen((s) => !s)}
      >
        ☰
      </button>

      {/* // The sidebar navigation */}
      <nav className={`bb-sidebar ${open ? "open" : ""}`} aria-label="Main Navigation">
        <div className="bb-sidebar_brand">BookBuddy</div>
        {/* // Navigation links */}
        <ul className="bb-sidebar_links" role="menu">
          {links.map((l) => (
            <li key={l.to} role="none">
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  isActive ? "bb-link bb-link--active" : "bb-link"
                }
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
