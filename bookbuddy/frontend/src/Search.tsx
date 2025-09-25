import React, {startTransition, useState} from 'react'
import type { BookDto } from './types/BookDto'
import Book_display from "./Book_display";

const BASE = '' // keep empty, proxy or relative path handles backend

export default function Search() {
    const [title, setTitle] = useState('')
    const [status, setStatus] = useState<string>('')
    const [book_results, Set_Book_results] = useState([]) //--> Sets React hook to store the search results

    const doAddBook = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("searching…");

        try {
            const searchRes = await fetch(`${BASE}/googlebooks/search/${encodeURIComponent(title)}`);
            if (!searchRes.ok) throw new Error(`Search failed: ${searchRes.status}`);

            const data = await searchRes.json();

            if (!data.docs || data.docs.length === 0) {
                setStatus("No results found ");
                return;
            }

            // updates the React hook and stores search results within hook to send it to Book_display.tsx
            Set_Book_results(data.docs)
            const first = data.docs[0]; // backend Doc format

            // ✅ matches BookDto in backend
            const newBook: BookDto = {
                bookname: first.bookname ?? "Unknown",
                author: first.author ?? "Unknown",
                isbn: first.isbn ?? "Unknown",
                genre: first.genre ?? "Unknown",
            };

            setStatus("adding…");

            const added = await fetch(`${BASE}/Book/addBook`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newBook),
            }).then(res => {
                if (!res.ok) throw new Error("Add failed: " + res.status);
                return res.json();
            });

            console.log(" Book saved to DB:", added);
            setStatus(`Book added: ${added.bookname} by ${added.author}`);
        } catch (e: any) {
            setStatus(e.message ?? "create book failed");
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
            <Book_display result={book_results}/>
            {status && <p style={{ marginTop: 16 }}>{status}</p>}
        </div>
        //idk how to do comments in the html part its typescript so its here
        //so here, is the comment for line #73.
        // This sends the book results as a prop to another file
    )
}

// HERE TO GET THE BRANCH ON THE THING
