import React, { useState } from 'react';
import "./components/Searchpage.css";
import { WishBookDto } from "./types/WishBookDto";

const BASE = ''; // keep empty, proxy or relative path handles backend


export default function WishlistButton({ nameOfBook }: { nameOfBook: string }) {

    // State to manage the button's status/feedback
    const [status, setStatus] = useState('');


    const add_book_to_wishlist = async (newWishBook: WishBookDto) => {
        setStatus("Adding book to wishlist...");
        try {
            const res = await fetch(`${BASE}/wishbooks/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newWishBook),
            });

            if (!res.ok) throw new Error("Add to wishlist failed: " + res.status);

            const added = await res.json();
            console.log("Book added to wishlist:", added);
            setStatus(`Added to wishlist: ${added.bookname} by ${added.author}`);
        } catch (err: any) {
            setStatus(err.message ?? "Error adding to wishlist");
        }
    };

    const doAddBook = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setStatus("Searching for book details...");

        try {

            const searchRes = await fetch(`${BASE}/googlebooks/search/${encodeURIComponent(nameOfBook)}`);
            if (!searchRes.ok) throw new Error(`Search failed: ${searchRes.status}`);

            const data = await searchRes.json();

            // Use the first result (data.docs[0]) for the wishlist object
            const bookData = data.docs && data.docs.length > 0 ? data.docs[0] : null;

            if (!bookData) {
                setStatus("No matching results found for this recommendation.");
                return;
            }


            const newWishBook: WishBookDto = {
                bookname: bookData.bookname ?? "Unknown",
                author: bookData.author ?? "Unknown",
                isbn: bookData.isbn ?? "Unknown",
                genre: bookData.genre ?? "Unknown",
                coverid: bookData.coverid ?? "Unknown",
                publication: bookData.publication ?? "Unknown",
                pagecount: bookData.pagecount ?? 0,
                description: bookData.description ?? "No description available",
            };


            await add_book_to_wishlist(newWishBook);

        } catch (err: any) {
            setStatus(err.message ?? "An error occurred during search or add.");
        }
    };

    return (
        <div style={{ maxWidth: 720, margin: '2rem auto', fontFamily: 'ui-sans-serif, system-ui' }}>
            {/* Display status feedback */}
            {status && <p style={{ fontWeight: 'bold' }}>{status}</p>}

            <button
                className="button-56"
                style={{ backgroundColor: '#3a1f1c', color: 'white' }}
                // Call doAddBook directly on click
                onClick={doAddBook}
                // Disable button if an action is in progress
                disabled={status.includes("Adding") || status.includes("Searching")}
            >
                ADD TO WISHLIST
            </button>
        </div>
    );
}