import React, { useState } from 'react'
import type { BookDto } from './types/BookDto'
import "./components/Searchpage.css";
import {WishBookDto} from "./types/WishBookDto";
const BASE = '' // keep empty, proxy or relative path handles backend



export default function Book_display({ result }: { result: BookDto[] }) {
    const [status, setStatus] = useState<string>('')
    const [bookname, setBookName] = useState<String>("")

    // function for adding book to user library
    // function takes in book object from search page based on what book the user wants
    function add_book_to_library(selected_book: BookDto) {
        return async (e: React.FormEvent) => {
            setStatus("Added book to library…");

            //prevents page from reload
            const newBook: BookDto = {
                bookname: selected_book.bookname ?? "Unknown",
                author: selected_book.author ?? "Unknown",
                isbn: selected_book.isbn ?? "Unknown",
                genre: selected_book.genre ?? "Unknown",
                coverid: selected_book.coverid ?? "Unknown",
                publication: selected_book.publication ?? "Unknown",
                pagecount: selected_book.pagecount ?? 0,
                description: selected_book.description ?? "No description available",
            };

            try {
                // sends item to backend
                const res = await fetch(`${BASE}/books/add`, {
                    //method of sending data
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    // ensures formating is propper. making the object into a json string
                    body: JSON.stringify(newBook),
                });

                // handles case where book already exists in user’s library
                if (res.status === 409) {
                    const msg = await res.text();
                    setStatus(msg || "Book already exists in user's library.");
                    return;
                }

                if (!res.ok) throw new Error("Add failed: " + res.status);

                const added = await res.json(); // backend now returns JSON via Map.of()
                console.log(" Book saved to DB:", added);
                // I kinda wanna change this so that book name and auther is displayed bold and the rest is not
                // but im unsure. leaving it default for now
                setStatus(`Book added! ${added.bookname} by ${added.author} is now in your library!`);
            } catch (err: any) {
                console.error("Add book error:", err);
                setStatus(err.message ?? "Error adding book to library.");
            }
        }
    }
        function add_book_to_wishlist(selected_book: WishBookDto) {
            return async (e: React.FormEvent) => {
                e.preventDefault();
                setStatus("Adding book to wishlist…");

                const newWishBook: WishBookDto = {
                    bookname: selected_book.bookname ?? "Unknown",
                    author: selected_book.author ?? "Unknown",
                    isbn: selected_book.isbn ?? "Unknown",
                    genre: selected_book.genre ?? "Unknown",
                    coverid: selected_book.coverid ?? "Unknown",
                    publication: selected_book.publication ?? "Unknown",
                    pagecount: selected_book.pagecount ?? 0,
                    description: selected_book.description ?? "No description available",
                };

                try {
                    const res = await fetch(`${BASE}/wishbooks/add`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newWishBook),
                    });

                    if (!res.ok) throw new Error("Add to wishlist failed: " + res.status);

                    const added = await res.json();
                    console.log("Book added to wishlist:", added);
                    setStatus(` Added to wishlist: ${added.bookname} by ${added.author}`);
                } catch (err: any) {
                    setStatus(err.message ?? "Error adding to wishlist");
                }
            };

    }
    return (

        <div style={{marginLeft: '-50px'}}>


            <h1 style={{marginLeft: 'auto' }}>Displaying Results:</h1>
            {status && <p style={{ fontWeight: "500", marginTop: 16, marginRight: -500 }}>{status}</p>}
            {result.length > 0 ? (
                <ul>
                    {/*sets up book mapping so that we can  access the object*/ }
                    {result.map((book) => (
                        // obtains each property from the book object start
                        <div key={book.isbn} style={{width:' 800px', border: '2px solid black', margin: '15px', padding: '15px' }}>

                            {/*set up formatting so we can have book image next to text*/}
                            <div style={{ display: 'flex' }}>
                                <img
                                    style={{ boxShadow: '5px 5px gray' }}
                                    src={
                                        book.coverid
                                            ? `https://books.google.com/books/content?id=${book.coverid}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`
                                            : "https://upload.wikimedia.org/wikipedia/en/a/a9/The_Hobbit_trilogy_dvd_cover.jpg"
                                    }
                                    alt={book.bookname || "Book cover"}
                                    width="200"
                                    height="250"
                                />
                                <div style={{ marginLeft: 'auto',margin: '15px' }}>
                                    <ul style={{ listStyleType: 'disc', fontSize: 20, }}>
                                        <li><strong>Title:</strong> {book.bookname}</li>
                                        <li><strong>By:</strong> {book.author}</li>
                                        <li><strong>Genre:</strong>{book.genre}</li>
                                        <li><strong>ISBN:</strong> {book.isbn}</li>
                                    </ul>
                                </div>
                            </div>
                            <button className={"button-56"} onClick={add_book_to_library(book)} >ADD BOOK TO MY LIBRARY </button>
                            <button
                                className="button-56"
                                style={{ backgroundColor: '#3a1f1c', color: 'white' }}
                                onClick={add_book_to_wishlist(book)}
                            >
                                ADD TO WISHLIST
                            </button>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>No results to display. Try searching for something!</p>
            )}
        </div>
    );
}




