import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { BookDto } from "./types/BookDto";
import { getMyLibrary } from "./api";
import "./components/Library.css";

export default function Library() {
    // allows us to navigate to different pages
    const navigate = useNavigate();
    // sets up react hooks for books, loading state and error state
    const [books, setBooks] = useState<BookDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // function to get book cover from Google Books api
    // uses template cover if nothing comes through
    const coverUrl = (coverid?: string) =>
        coverid ? `https://books.google.com/books/content?id=${coverid}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api` : "https://upload.wikimedia.org/wikipedia/en/a/a9/The_Hobbit_trilogy_dvd_cover.jpg";

    // on component load, fetch the user's library
    useEffect(() => {
        (async () => {
            try {
                const data = await getMyLibrary();
                setBooks(Array.isArray(data) ? data : []);
            } catch (e: any) {
                // if auth error, redirect to login
                if (e?.message === "AUTH") {
                    navigate("/login");
                    return;
                }
                // otherwise set error state
                setError(e?.message ?? "Failed to load library");
            } finally {
                setLoading(false);
            }
        })();
    }, [navigate]);

    // render loading, error, or the library
    if (loading) {
        return (
            <div className="bb-lib wrap">
                <h1 className="bb-lib__title">My Library</h1>
                <p className="bb-lib__status">Loading your books…</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bb-lib wrap">
                <h1 className="bb-lib__title">My Library</h1>
                <div className="bb-lib__error" role="alert">{error}</div>
                {/* Shows a button to go to search if you have no books */}
                <button className="bb-btn" onClick={() => navigate("/search")}>Go to Search</button>
            </div>
        );
    }

    // Main library display
    return (
        <div className="bb-lib wrap">
            <div className="bb-lib__header">
                <h1 className="bb-lib__title">My Library</h1>
            </div>
            {/* // Shows a button to go to search if you have no books */}
            {books.length === 0 ? (
                <div className="bb-empty">
                    <p>You haven't added any books yet.</p>
                    <button className="bb-btn" onClick={() => navigate("/search")}>Search for books</button>
                </div>
            ) : (
                // If there are books, display them in a grid
                <ul className="bb-grid" aria-label="Your saved books">
                    {books.map((b, i) => (
                        // Each book card
                        <li key={(b.isbn ?? "no-isbn") + "-" + i} className="bb-card">
                            <div className="bb-card__media">
                                {/* // Book cover image with fallback on error */}
                                <img
                                    src={coverUrl(b.id)}
                                    alt={`${b.bookname ?? "Book"} cover`}
                                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/hobbit-placeholder.jpg"; }}
                                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                />
                            </div>
                            <div className="bb-card__body">
                                {/* //Shows bookname in card */}
                                <h2 className="bb-card__title">{b.bookname || "Untitled"}</h2>
                                {/* // Shows author if there is one */}
                                {b.author && <div className="bb-card__meta">{b.author}</div>}
                                {/* // Shows isbn and genre if they exist */}
                                {(b.isbn || b.genre) && (
                                    <div className="bb-card__tags">
                                        {b.isbn && <span className="bb-tag">ISBN: {b.isbn}</span>}
                                        {b.genre && <span className="bb-tag">{b.genre}</span>}
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}