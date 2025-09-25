import React, { useState } from 'react'
import type { BookDto } from './types/BookDto'
import "./css/Searchpage.css";
const BASE = '' // keep empty, proxy or relative path handles backend



// Correctly type the result prop as an array of BookDto objects
export default function Book_display({ result }: { result: BookDto[] }) {

    return (
        <div style={{marginLeft: '-50px'}}>
            <h1 style={{marginLeft: 'auto' }}>Displaying Results:</h1>
            {result.length > 0 ? (
                <ul>
                    {/* Iterate over the array and render a specific property from each object */}
                    {result.map((book) => (
                        <div key={book.isbn} style={{width:' 800px', border: '2px solid black', margin: '15px', padding: '15px' }}>
                            <div style={{ display: 'flex' }}>
                                <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/The_Hobbit_trilogy_dvd_cover.jpg" alt="BOOK" width="200" height="250"/>
                                {/* This is the child div that will be pushed to the right */}
                                <div style={{ marginLeft: 'auto',margin: '15px' }}>
                                    <ul style={{ listStyleType: 'disc' }}>
                                        <li><strong>{book.bookname}</strong></li>
                                        <li>by {book.author}</li>
                                        <li>genre {book.genre}</li>
                                        <li>isbn: {book.isbn}</li>
                                    </ul>
                                </div>
                            </div>

                            <button  className={"button-56"} >ADD BOOK TO MY LIBRARY </button>

                        </div>

                    ))}

                </ul>
            ) : (
                <p>No results to display. Try searching for something!</p>
            )}
        </div>
    );
}
// add the button back *************************************
// const doAddBook = async (e: React.FormEvent) => {
//     const [status, setStatus] = useState<string>('')
//     e.preventDefault();
//     setStatus("searching…");
//
//     try {
//         const searchRes = await fetch(`${BASE}/googlebooks/search/${encodeURIComponent(title)}`);
//         if (!searchRes.ok) throw new Error(`Search failed: ${searchRes.status}`);
//
//         const data = await searchRes.json();
//
//         if (!data.docs || data.docs.length === 0) {
//             setStatus("No results found ");
//             return;
//         }
//
//         // we may or may not need this
//         Set_Book_results(data.docs)
//         const first = data.docs[0]; // backend Doc format
//
//         // ✅ matches BookDto in backend
//         const newBook: BookDto = {
//             bookname: first.bookname ?? "Unknown",
//             author: first.author ?? "Unknown",
//             isbn: first.isbn ?? "Unknown",
//             genre: first.genre ?? "Unknown",
//         };
//
//         setStatus("adding…");
//
//         const added = await fetch(`${BASE}/Book/addBook`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(newBook),
//         }).then(res => {
//             if (!res.ok) throw new Error("Add failed: " + res.status);
//             return res.json();
//         });
//
//         console.log(" Book saved to DB:", added);
//         setStatus(`Book added: ${added.bookname} by ${added.author}`);
//     } catch (e: any) {
//         setStatus(e.message ?? "create book failed");
//     }
// };