import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./login";
import Signup from "./signup";
import Search from "./Search";
import Library from "./Library";
import WishBook from "./WishList";
import Buddy from "./Buddy_Recommendation";

// Main application component with routing
export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<Layout />}>
                <Route path="/search" element={<Search />} />
                <Route path="/library" element={<Library />} />
                <Route path="/WishBook" element={<WishBook />} />
                <Route path="/Buddy_Recommendation" element ={<Buddy />} />

            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
    );
}
