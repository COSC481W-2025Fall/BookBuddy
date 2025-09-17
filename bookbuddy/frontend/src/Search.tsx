import React, { useState } from 'react'
import { addBook } from './api'
import type { BookDto } from './types/BookDto'

const BASE = ''

export default function Search() {
    const [title, setTitle] = useState('')
    const [status, setStatus] = useState<string>('')

    const doAddBook = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("searching…");

        try {
            const searchRes = await fetch(`${BASE}/openlib/search/${encodeURIComponent(title)}`);
            if (!searchRes.ok) throw new Error(`Search failed: ${searchRes.status}`);

            const data = await searchRes.json();

            if (!data.docs || data.docs.length === 0) {
                setStatus("No results found ❌");
                return;
            }

            const first = data.docs[0];

            // Match BookDto in backend
            const newBook: BookDto = {
                bookname: first.title,
                author: first.author_name ? first.author_name[0] : "Unknown",
                isbn: "null",
                genre: "Unknown",  // ✅ default to prevent DB error
            };

            setStatus("adding…");

            const added = await fetch("/Book/addBook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newBook),
            }).then(res => {
                if (!res.ok) throw new Error("Add failed: " + res.status);
                return res.json();
            });

            console.log("✅ Book saved to DB:", added);
            setStatus(`Book added: ${added.bookname} by ${added.author}`);
        } catch (e: any) {
            setStatus(e.message ?? "createbook failed");
        }
    };


    return (
        <div style={{ maxWidth: 720, margin: '2rem auto', fontFamily: 'ui-sans-serif, system-ui' }}>
            <h1>THE BOOK SEARCH</h1>
            <form onSubmit={doAddBook}>
                <label>
                    Please enter a book you would like to search
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Book to search"
                        style={{ display: 'block', marginTop: 8, width: '100%' }}
                        required
                    />
                </label>
                <button type="submit" style={{ marginTop: 12 }}>Search</button>
            </form>

            {status && <p style={{ marginTop: 16 }}>{status}</p>}
        </div>
    )
}
