import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import logo from "../logo/bookbuddy-logo-mywristhurts.png";

export default function Sidebar() {
  // State to manage sidebar visibility if wanted
  const [open, setOpen] = useState<boolean>(false);

  //Defines the navigation links, can be added to later
  const links: { to: string; label: string }[] = [
    { to: "/search", label: "Search" },
    { to: "/library", label: "Library" },
    { to: "/WishBook", label: "WishList" },
      { to:"/Buddy_Recommendation", label: "Ask a buddy"},
    { to: "/login", label: "Sign Out" }

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


            <nav
                className={`bb-sidebar ${open ? "open" : ""}`}
                aria-label="Main Navigation"
            >
                <div className="bb-sidebar_brand">
                    <img
                        src={logo}
                        alt="BookBuddy"
                        className="h-12 w-auto mb-2 rounded-lg shadow-sm"
                    />
                    <span>BookBuddy</span>
                </div>

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

                    {/* Sign Out item */}
                    <li role="none">
            <span

                className="bb-link cursor-pointer text-red-600 hover:text-red-700"
                role="menuitem"
            >
              Sign Out
            </span>
                    </li>
                </ul>
            </nav>
        </>
    );
}