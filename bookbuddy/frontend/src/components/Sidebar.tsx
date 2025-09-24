import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const [open, setOpen] = useState<boolean>(false);

  const links: { to: string; label: string }[] = [
    { to: "/", label: "Home" },
    { to: "/search", label: "Search" },
    { to: "/library", label: "Library" },
    { to: "/login", label: "Sign Out" },
  ];

  return (
    <>
      <button
        className="bb-sidebar_toggle"
        aria-label="Toggle navigation"
        onClick={() => setOpen((s) => !s)}
      >
        ☰
      </button>

      <nav className={`bb-sidebar ${open ? "open" : ""}`} aria-label="Main Navigation">
        <div className="bb-sidebar_brand">BookBuddy</div>

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
