import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import logo from "../logo/bookbuddy-logo-mywristhurts.png";

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const links = [
        { to: "/profile", label: "Profile" },
        { to: "/search", label: "Search" },
        { to: "/library", label: "Library" },
        { to: "/WishBook", label: "WishList" },
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
                <img src={logo} alt="Welcome to BookBuddy" width="100" height="100" />

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

                    {/* Sign Out styled like other links */}
                    <li role="none">
            <span
                className="bb-link"
                onClick={() => {
                    localStorage.clear();
                    navigate("/login", { replace: true });
                }}
                role="menuitem"
                style={{ cursor: "pointer" }}
            >
              Sign Out
            </span>
                    </li>
                </ul>
            </nav>
        </>
    );
}