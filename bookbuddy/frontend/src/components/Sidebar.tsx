import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
    const links: { to: string; label: string }[] = [
        {to: "/", label: "Home"},
        { to: "/search", label: "Search" },
        { to: "/library", label: "Library" },
        { to: "/login", label: "Sign Out" },
    ];

    return (
        <nav className="bb-sidebar" aria-label="Main Navigation">
            <div className="bb-sidebar_brand">BookBUddy</div>

            <ul className="bb-sidebar_list">
                {links.map((l) => (
                    <li key={l.to} className="bb-sidebar_item">
                        <NavLink
                            to={l.to}
                            end={l.to === "/"}
                            className={({ isActive }) =>
                                isActive ? "bb-link bb-link--active" : "bb-link"
                            }
                        >
                            {l.label}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <div className="bb-sidebar_footer">© 2024 BookBuddy</div>
            </nav>
    );
}