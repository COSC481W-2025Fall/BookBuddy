import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
// import logo from "../logo/bookbuddy-logo-mywristhurts.png"; // Kept for reference, but not used in the final JSX below

export default function Sidebar() {
    // State to manage sidebar visibility
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    // Defines the navigation links
    const links: { to: string; label: string }[] = [
        { to: "/profile", label: "Profile" }, // Added from the second fragment
        { to: "/search", label: "Search" },
        { to: "/library", label: "Library" },
        { to: "/WishBook", label: "WishList" },
        { to: "/Buddy_Recommendation", label: "Ask a Buddy" },
    ];

    // Sign-out logic
    const handleSignOut = () => {
        // Clear all storage and session data
        localStorage.clear();
        sessionStorage.clear();

        // Navigate to login and replace the history entry
        navigate("/login", { replace: true });

        // Scroll to top
        window.scrollTo(0, 0);
    };

    // Render the sidebar with navigation links
    return (
        <>
            {/* Button to toggle sidebar visibility */}
            <button
                className="bb-sidebar_toggle bookmark-icon" // Corrected class name
                aria-label="Toggle navigation"
                onClick={() => setOpen((s) => !s)}
            >
                <div className="bookmark icon"></div>
            </button>

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
                                role="menuitem" // Added for accessibility
                                // Removed the misplaced JS code from the className prop
                            >
                                {l.label}
                            </NavLink>
                        </li>
                    ))}

                    {/* Sign Out item */}
                    <li role="none">
            <span
                onClick={handleSignOut}
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