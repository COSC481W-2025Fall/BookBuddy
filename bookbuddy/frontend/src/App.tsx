import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./login";
import Signup from "./signup";
import Search from "./Search";
import Library from "./Library";
import WishList from "./WishBook";
import Buddy from "./Buddy_Recommendation";
import Profile from "./Profile";

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
                <Route path="/WishList" element={<WishList />} />
                <Route path="/Buddy_Recommendation" element ={<Buddy />} />
                <Route path="/Profile" element={Profile} />

            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
    );
}
