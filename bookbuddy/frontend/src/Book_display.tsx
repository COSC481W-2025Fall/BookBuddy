import React, { useState } from 'react'
import type { BookDto } from './types/BookDto'
const BASE = '' // keep empty, proxy or relative path handles backend


// Main function that we can call it in the book user Library and within the search page (ideally)
export default function Book_display({ result }: { result: BookDto[] }) {
    // returns results right away since to processing is needed before displaying  books to user.
    return (
        <div style={{marginLeft: '-50px'}}>
            {/* dog */}
            <h1 style={{marginLeft: 'auto' }}>Displaying Results:</h1>
            {result.length > 0 ? (
                <ul>
                    {/*sets up book mapping so that we can  access the object*/ }
                    {result.map((book) => (
                        // obtains each property from the book object start
                        <div key={book.isbn} style={{width:' 800px', border: '2px solid black', margin: '15px', padding: '15px' }}>
                            {/*set up formatting so we can have book image next to text*/}
                            <div style={{ display: 'flex' }}>
                                <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/The_Hobbit_trilogy_dvd_cover.jpg" alt="BOOK" width="200" height="250"/>
                                <div style={{ marginLeft: 'auto',margin: '15px' }}>
                                    <ul style={{ listStyleType: 'disc' }}>
                                        <li><strong>{book.bookname}</strong></li>
                                        <li>by {book.author}</li>
                                        <li>genre {book.genre}</li>
                                        <li>isbn: {book.isbn}</li>
                                    </ul>
                                </div>
                            </div>
                            <button style={{marginTop: "10px", width:"25%"}}>ADD BOOK TO MY LIBRARY </button>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>No results to display. Try searching for something!</p>
            )}
        </div>
    );
}