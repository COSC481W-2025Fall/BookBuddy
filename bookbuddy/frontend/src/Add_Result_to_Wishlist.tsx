import React, { useState, useEffect } from 'react'; // 1. Import useEffect
import "./components/Searchpage.css";
import { WishBookDto } from "./types/WishBookDto";

const BASE = '';

// Define a  initial state for the book data
const initialBookState: Partial<WishBookDto> = {
    bookname: "Searching...",
    author: "",
    coverid: ""
};

export default function WishlistButton({ nameOfBook }: { nameOfBook: string }) {

    const [status, setStatus] = useState('');
    const [bookData, setBookData] = useState<Partial<WishBookDto>>(initialBookState);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [button_cliced, setButton_cliced] = useState("ADD TO WISHLIST");

    // Function to handle the  fetching and parsing of book data
    const fetchBookData = async (name: string) => {
        setStatus("Searching for book details...");
        setIsDataLoaded(false);

        try {
            const searchRes = await fetch(`${BASE}/googlebooks/search/${encodeURIComponent(name)}`);
            if (!searchRes.ok) throw new Error(`Search failed: ${searchRes.status}`);

            const data = await searchRes.json();
            const fetchedBookData = data.docs && data.docs.length > 0 ? data.docs[0] : null;

            if (!fetchedBookData) {
                setStatus("No matching results found.");
                setBookData({ bookname: "Book Not Found", author: "" });
                return null;
            }

            const newWishBook: WishBookDto = {
                bookname: fetchedBookData.bookname ?? "Unknown",
                author: fetchedBookData.author ?? "Unknown",
                isbn: fetchedBookData.isbn ?? "Unknown",
                genre: fetchedBookData.genre ?? "Unknown",
                coverid: fetchedBookData.coverid ?? "Unknown",
                publication: fetchedBookData.publication ?? "Unknown",
                pagecount: fetchedBookData.pagecount ?? 0,
                description: fetchedBookData.description ?? "No description available",
            };


            setBookData(newWishBook);
            setStatus("Would you like to add this book to your wishlist?");
            return newWishBook;

        } catch (err: any) {
            setStatus(err.message ?? "An error occurred during search.");
            setBookData({ bookname: "", author: "" });
            return null;
        } finally {
            setIsDataLoaded(true);
        }
    };


    // 3. Use useEffect to call fetchBookData automatically on mount
    useEffect(() => {
        fetchBookData(nameOfBook);
    }, [nameOfBook]);


    // calls function to add book to wishlist, BOOK DTO and spits out wishlist book
    const add_book_to_wishlist = async (newWishBook: WishBookDto) => {
        setStatus("Adding book to wishlist...");
        try {
            // Your existing add to wishlist logic
            const res = await fetch(`${BASE}/wishbooks/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newWishBook),
            });

            if (!res.ok) throw new Error("This book is already on your wishlist.");

            const added = await res.json();
            console.log("Book added to wishlist:", added);
            setStatus(`Added to wishlist: ${added.bookname} by ${added.author}`);
        } catch (err: any) {
            setStatus(err.message ?? "Error adding to wishlist");
        }
    };


    // Function executed when the button is clicked
    const doAddBook = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setButton_cliced("BOOK ADDED!");

        // Check if bookData has already been loaded by useEffect
        if (!bookData.coverid || !isDataLoaded) {
            setStatus("Book details still loading or failed to load. Please try again.");
            // Optional: Force a re-fetch if needed
            const refetchedBook = await fetchBookData(nameOfBook);
            if (refetchedBook) {
                await add_book_to_wishlist(refetchedBook);
            }
            return;
        }

        // Use the bookData object already stored in state
        await add_book_to_wishlist(bookData as WishBookDto);
    };

    // --- JSX Return ---

    return (
        <div style={{ maxWidth: "85%",
            maxHeight: "85%",
            margin: '2rem auto',
            width: 'auto',
            height: 'auto',
            fontFamily: 'ui-sans-serif, ' +
                'system-ui',
            position: 'relative',
            justifyContent: 'flex-start',
            padding: '20px',
        }}>

            {/* Display status feedback */}
            {/* Book details section */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' ,
                marginTop:"5px"}}>
                <img
                    style={{ boxShadow: '5px 5px gray' }}
                    src={
                        bookData.coverid
                            ? `https://books.google.com/books/content?id=${bookData.coverid}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`
                            : "https://placehold.co/150x250?text=Loading+Book+cover"
                    }

                    width="150"
                    height="250"
                />

                <h3 style={{ marginTop: '0.5rem' }}>
                    {/* Check if data is loaded AND book name exists */}
                    {isDataLoaded && bookData.bookname && bookData.bookname !== "Book Not Found"
                        ? bookData.bookname // If true, display the actual book name
                        : isDataLoaded && bookData.bookname === "Book Not Found"
                            ? "Book Not Found" // If data loaded but search failed
                            : "Loading Book Title..." // Default message while loading

                    }</h3>
                <p>By: {bookData.author}</p>

            </div>
            {/* Wrap button in a Flex container and center it */}

            <div style={{ display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', }}>
                {status && <p style={{ fontWeight: 'bold' }}>{status}</p>}


                <button
                    className="button-56"
                    style={{ backgroundColor: '#3a1f1c', color: 'white' }}
                    onClick={doAddBook}
                    disabled={!isDataLoaded || status.includes("Adding") ||
                        status.includes("Searching")|| status.includes("This book is already on your wishlist.")}
                >
                    {button_cliced}
                </button>
            </div>



        </div>
    );
}