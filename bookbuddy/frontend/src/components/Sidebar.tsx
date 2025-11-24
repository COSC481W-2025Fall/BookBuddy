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

  // Render the sidebar with navigation links
  return (
    <>
    {/* // Button to toggle sidebar visibility */}
        <button
            className="bb-sidebar_toggle bookmark.icon"
            aria-label="Toggle navigation"
            onClick={() => setOpen((s) => !s)}
        >
            <div className="bookmark icon"></div>
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
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    //  navigation links
    const links: { to: string; label: string }[] = [
        { to: "/profile", label: "Profile" },
        { to: "/search", label: "Search" },
        { to: "/library", label: "Library" },
        { to: "/WishBook", label: "WishList" },
        { to: "/Buddy_Recommendation", label: "Ask a Buddy" },
    ];

    //  sign-out logic
    const handleSignOut = () => {
        // Clear all storage and session data
        localStorage.clear();
        sessionStorage.clear();

        // Use replace so the back button can't go back to private routes
        navigate("/login", { replace: true });

        // Scroll to top in case layout persists
        window.scrollTo(0, 0);
    };

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