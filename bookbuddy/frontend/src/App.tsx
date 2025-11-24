import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./login";
import Signup from "./signup";
import Search from "./Search";
import Library from "./Library";
import WishBook from "./WishBook";
import Profile from "./Profile";
import Buddy from "./Buddy_Recommendation";


//  Protect pages from being accessed without login
function ProtectedRoute({ children }: { children: JSX.Element }) {
    const accountId = localStorage.getItem("accountId");

    // If not logged in, redirect to login
    if (!accountId) {
        return <Navigate to="/login" replace />;
    }

    return children;

}

//  Main application component with routing
export default function App() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected routes inside Layout */}
            <Route element={<Layout />}>
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/search"
                    element={
                        <ProtectedRoute>
                            <Search />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/library"
                    element={
                        <ProtectedRoute>
                            <Library />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/WishBook"
                    element={
                        <ProtectedRoute>
                            <WishBook />
                        </ProtectedRoute>
                    }
                />
               <Route
                    path="/Buddy_Recommendation"
                    element={
                        <ProtectedRoute>
                            <Buddy />
                        </ProtectedRoute>
                    }
                />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}