import React, { useState } from 'react'
import type { BookDto } from './types/BookDto'
import "./components/Searchpage.css";
const BASE = '' // keep empty, proxy or relative path handles backend


// Main function that we can call it in the book user Library and within the search page (ideally)
export default function Book_display({ result }: { result: BookDto[] }) {
    const [status, setStatus] = useState<string>('')
    const [bookname, setBookName] = useState<String>("")

    // function for adding book to user library
    // function takes in book object from search page based on what book the user wants
    function add_book_to_library(selected_book: BookDto) {
        return async (e: React.FormEvent) => {
            setStatus("Attempting to add book to library…");

            //prevents page from reload
            e.preventDefault();
            // creates new book object
            const newBook: BookDto = {
                bookname: selected_book.bookname ?? "Unknown",
                author: selected_book.author ?? "Unknown",
                isbn: selected_book.isbn ?? "Unknown",
                genre: selected_book.genre ?? "Unknown",
                coverid: selected_book.coverid ?? "Unknown",
                coverLink: `https://books.google.com/books/content?id=${selected_book.coverid}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`,
            };

            // sends item to backend
            const added = await fetch(`${BASE}/books/add`, {
                //method of sending data
                method: "POST",
                headers: {"Content-Type": "application/json"},
                // ensures formating is propper. making the object into a json string
                body: JSON.stringify(newBook),
            }).then(res => {
                if (!res.ok) throw new Error("Add failed: " + res.status);
                return res.json();
            });
            setStatus("DONE…");

            console.log(" Book saved to DB:", added);
            // I kinda wanna change this so that book name and auther is displayed bold and the rest is not
            // but im unsure. leaving it default for now
            setStatus(`Book added! ${added.bookname} by ${added.author} Is now in your library!`);

        }
    }

    return (

        <div style={{marginLeft: '-50px'}}>

            {/* dog */}
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
                                <img style={{  boxShadow: '5px 5px gray'}} src={book.coverLink} alt="BOOK" width="200" height="250"/>
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
                        </div>
                    ))}
                </ul>
            ) : (
                <p>No results to display. Try searching for something!</p>
            )}
        </div>
    );
}




