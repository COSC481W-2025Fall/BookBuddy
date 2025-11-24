import React, { useState } from 'react'
import type { WishBookDto } from './types/WishBookDto'
import "./components/Searchpage.css";
const BASE = '' // keep empty, proxy or relative path handles backend


// Main function that we can call it in the wishbook user wishlist and within the search page (ideally)
export default function WishBook_display({ result }: { result: WishBookDto[] }) {
    const [status, setStatus] = useState<string>('')
    const [wishbookname, setWishBookName] = useState<String>("")

    // function for adding wishbook to user library
    // function takes in wishbook object from search page based on what wishbook the user wants
    function add_book_to_wishlist(selected_wishbook: WishBookDto) {
        return async (e: React.FormEvent) => {
            setStatus("Added book to wishlist…");

            //prevents page from reload
            e.preventDefault();
            // creates new wishbook object
            const newWishBook: WishBookDto = {
                bookname: selected_wishbook.bookname ?? "Unknown",
                author: selected_wishbook.author ?? "Unknown",
                isbn: selected_wishbook.isbn ?? "Unknown",
                genre: selected_wishbook.genre ?? "Unknown",
                coverid: selected_wishbook.coverid ?? "Unknown",
                publication: selected_wishbook.publication ?? "Unknown",
                pagecount: selected_wishbook.pagecount ?? 0,
                description: selected_wishbook.description ?? "No description available",
            };

            // sends item to backend
            const added = await fetch(`${BASE}/wishbooks/add`, {
                //method of sending data
                method: "POST",
                headers: {"Content-Type": "application/json"},
                // ensures formating is propper. making the object into a json string
                body: JSON.stringify(newWishBook),
            }).then(res => {
                if (!res.ok) throw new Error("Book already in wishlist or failed to add");
                return res.json();
            });
            setStatus("DONE…");

            console.log(" WishBook saved to DB:", added);
            // I kinda wanna change this so that wishbook name and auther is displayed bold and the rest is not
            // but im unsure. leaving it default for now
            setStatus(`WishBook added! ${added.wishbookname} by ${added.author} Is now in your library!`);

        }
    }
    return (

        <div style={{marginLeft: '-50px'}}>

            {/* dog */}
            <h1 style={{marginLeft: 'auto' }}>Displaying Results:</h1>
            {status && <p style={{ fontWeight: "500", marginTop: 16, marginRight: -500 }}>{status}</p>}
            {result.length > 0 ? (
                <ul>
                    {/*sets up wishbook mapping so that we can  access the object*/ }
                    {result.map((wishbook) => (
                        // obtains each property from the wishbook object start
                        <div key={wishbook.isbn} style={{width:' 800px', border: '2px solid black', margin: '15px', padding: '15px' }}>

                            {/*set up formatting so we can have wishbook image next to text*/}
                            <div style={{ display: 'flex' }}>
                                <img style={{  boxShadow: '5px 5px gray'}} src="https://upload.wikimedia.org/wikipedia/en/a/a9/The_Hobbit_trilogy_dvd_cover.jpg" alt="BOOK" width="200" height="250"/>
                                <div style={{ marginLeft: 'auto',margin: '15px' }}>
                                    <ul style={{ listStyleType: 'disc', fontSize: 20, }}>
                                        <li><strong>Title:</strong> {wishbook.bookname}</li>
                                        <li><strong>By:</strong> {wishbook.author}</li>
                                        <li><strong>Genre:</strong>{wishbook.genre}</li>
                                        <li><strong>ISBN:</strong> {wishbook.isbn}</li>
                                    </ul>
                                </div>
                            </div>
                            <button className={"button-56"} onClick={add_book_to_wishlist(wishbook)} >ADD BOOK TO MY WISHLIST </button>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>No results to display. Try searching for something!</p>
            )}
        </div>
    );
}




