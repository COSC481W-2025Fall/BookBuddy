import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AccountDto } from "./types/AccountDto";
import type { BookDto } from "./types/BookDto";
import {getAccountById, getCurrentUser, getMyLibrary} from "./api";

export default function Profile() {
    const navigate = useNavigate();
    const [account, setAccount] = useState<AccountDto | null>(null);
    const [books, setBooks] = useState<BookDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Calculate total pages
    const totalPages = books.reduce((sum, b) => sum + (b.pagecount || 0), 0);

    useEffect(() => {
        (async () => {
            try {
                const acct = await getCurrentUser();
                setAccount(acct);

                const lib = await getMyLibrary();
                setBooks(lib);
            } catch (e: any) {
                console.error(e);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        })();
    }, [navigate]);

    if (loading) {
        return (
            <div className="wrap">
                <h1>Loading profile...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="wrap">
                <h1>Profile</h1>
                <p style={{ color: "red" }}>{error}</p>
            </div>
        );
    }

    return (
        <div className="wrap">
            <h1>Hello, {account?.name || "Reader"}!</h1>
            <div className="bb-card" style={{ padding: "20px", maxWidth: "600px" }}>
                <p><strong>Books in Library:</strong> {books.length}</p>
                <p><strong>Total Pages:</strong> {totalPages.toLocaleString()}</p>
            </div>

            <button className="bb-btn" onClick={() => navigate("/library")} style={{ marginTop: "20px" }}>
                Go to My Library
            </button>
        </div>
    );
}