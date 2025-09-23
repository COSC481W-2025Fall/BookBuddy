import React, { useState } from 'react'
import type { BookDto } from './types/BookDto'
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

                        // Access a property, for example, book.title
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