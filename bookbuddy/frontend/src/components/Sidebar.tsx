import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";


// Sidebar component with navigation links
export default function Sidebar() {

    const [open, setOpen] = useState<boolean>(false);

    // Effect to control scrolling on the <body> element
    useEffect(() => {
        const body = document.body;
        if (open) {
            // When the sidebar is open, add the class to prevent scrolling
            body.classList.add("sidebar-open");
        } else {
            // When the sidebar is closed, remove the class to allow scrolling
            body.classList.remove("sidebar-open");
        }

        return () => {
            body.classList.remove("sidebar-open");
        };
    }, [open]);

    // Defines the navigation links, can be added to later
    const links: { to: string; label: string }[] = [
        { to: "/search", label: "Search" },
        { to: "/library", label: "Library" },
        { to: "/WishBook", label: "WishList" },
        { to: "/Buddy_Recommendation", label: "Ask a buddy"},
        { to: "/profile", label: "Profile" },
        { to: "/", label: "Sign Out" }
    ];


    return (
        <>
            {/* Button to toggle sidebar visibility */}
            <button
                className="bb-sidebar_toggle"
                aria-label="Toggle navigation"
                onClick={() => setOpen((s) => !s)}
            >
                <div className={"bookmark icon"}></div>
            </button>

            {open && (
                <div
                    className="bb-backdrop"
                    onClick={() => setOpen(false)}
                    role="button"
                    tabIndex={0}
                    aria-hidden={!open}
                    aria-label="Close menu"
                ></div>
            )}

            {/* The sidebar navigation */}
            <nav className={`bb-sidebar ${open ? "open" : ""}`} aria-label="Main Navigation">
                <div className="bb-sidebar_brand">BookBuddy</div>
                {/* Navigation links */}
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
                                onClick={() => setOpen(false)} // Closes sidebar on navigation
                            >
                                {l.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div className="bb-sidebar_footer">
                    &copy; 2025 BookBuddy
                </div>
            </nav>
        </>
    );
}