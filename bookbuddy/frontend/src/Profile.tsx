import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AccountDto } from "./types/AccountDto";
import type { BookDto } from "./types/BookDto";
import { getCurrentUser, getMyLibrary } from "./api";

import "./Styling/Profile.css";

export default function Profile() {
    const navigate = useNavigate();
    const [account, setAccount] = useState<AccountDto | null>(null);
    const [books, setBooks] = useState<BookDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                navigate("/");
            } finally {
                setLoading(false);
            }
        })();
    }, [navigate]);

    if (loading) {
        return (
            <div className="profileBackground">
                <div className="profileCard">
                    <h1>Loading profile...</h1>
                </div>
            </div>
        );
    }



    return (
        <div className="profileBackground">
            <div className="profileCard">
                <h1>Hello, {account?.name || "Reader"}!</h1>

                <div className="profileStats">
                    <p><strong>Books in Library:</strong> {books.length}</p>
                    <p><strong>Total Pages:</strong> {totalPages.toLocaleString()}</p>
                    <p><strong>AI Uses Remaining:</strong> {account?.aiLimit}</p>
                </div>

                <button className="profileButton" onClick={() => navigate("/library")}>
                    Go to My Library
                </button>
            </div>
        </div>
    );
}
