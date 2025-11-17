import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import type {WishBookDto} from "./types/WishBookDto";
import {getMyWishBook} from "./api";
import { removeFromWishlist } from "./api";
import "./logo/noCoverFound.png";

export default function WishBook() {
    // allows us to navigate to different pages
    const navigate = useNavigate();
    // sets up react hooks for wishbooks, loading state and error state
    const [wishbooks, setWishBooks] = useState<WishBookDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // cover retrieval using Google Books coverid
    const coverUrl = (coverid?: string) =>
        coverid
            ? `https://books.google.com/books/content?id=${coverid}&fife=w400-h600&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`
            : "./logo/noCoverFound.png";


    // on component load, fetch the user's library
    useEffect(() => {
        (async () => {
            try {
                const data = await getMyWishBook();
                setWishBooks(Array.isArray(data) ? data : []);
            } catch (e: any) {
                // if auth error, redirect to login
                if (e?.message === "AUTH") {
                    navigate("/login");
                    return;
                }
                // otherwise set error state
                setError(e?.message ?? "Failed to load wishlist");
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
                <p className="bb-lib__status">Loading your wishbooks…</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bb-lib wrap">
                <h1 className="bb-lib__title">My WishList</h1>
                <div className="bb-lib__error" role="alert">{error}</div>
                {/* Shows a button to go to search if you have no wishbooks */}
                <button className="bb-btn" onClick={() => navigate("/search")}>Go to Search</button>
            </div>
        );
    }

    // Main library display
    return (
        <div className="bb-lib wrap">
            <div className="bb-lib__header">
                <h1 className="bb-lib__title">My WishList</h1>
            </div>
            {/* // Shows a button to go to search if you have no wishbooks */}
            {wishbooks.length === 0 ? (
                <div className="bb-empty">
                    <p>You haven't added any wishbooks yet.</p>
                    <button className="bb-btn" onClick={() => navigate("/search")}>Search for wishbooks</button>
                </div>
            ) : (
                // If there are wishbooks, display them in a grid
                <ul className="bb-grid" aria-label="Your saved wishbooks">
                    {wishbooks.map((b, i) => (
                        // Each wishbook card
                        <li key={(b.isbn ?? "no-isbn") + "-" + i} className="bb-card">
                            <div className="bb-card__media">
                                {/* // WishBook cover image with fallback on error */}
                                <img
                                    src={coverUrl(b.coverid)}
                                    alt={`${b.bookname ?? "WishBook"} cover`}
                                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/hobbit-placeholder.jpg"; }}
                                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                />
                            </div>
                            <div className="bb-card__body">
                                {/* //Shows wishbookname in card */}
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
                                {/* // Remove Button*/}
                                <button
                                  className="bb-btn bb-btn--danger"
                                  style={{ marginTop: "10px" }}
                                  onClick={async () => {
                                    try {
                                      await removeFromWishlist(b.isbn!);
                                      setWishBooks(wishbooks.filter(w => w.isbn !== b.isbn));
                                    } catch (err: any) {
                                      alert(err.message ?? "Failed to remove from wishlist");
                                    }
                                  }}
                                >
                                  Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}