import React, { useState, useRef } from "react";
import type { BookDto } from "./types/BookDto";
import type { WishBookDto } from "./types/WishBookDto";
import "./components/Searchpage.css";
import "./components/Book_loading.css";
import noCoverFound from "./logo/noCoverFound.png";
import ToastHost from "./ToastHost";

const BASE = "";

type ToastType = "success" | "error" | "info";

type Toast = {
    id: number;
    message: string;
    type: ToastType;
    closing?: boolean;
};

const SearchPage: React.FC = () => {
    const [title, setTitle] = useState("");
    const [searchStatus, setSearchStatus] = useState<string>("");
    const [bookResults, setBookResults] = useState<BookDto[]>([]);

    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const [toasts, setToasts] = useState<Toast[]>([]);
    const nextToastId = useRef(1);

    // ✅ PRESS LIMITS (per book, per button)
    const PRESS_LIMIT = 5;
    const [libraryPressCount, setLibraryPressCount] = useState<Record<string, number>>(
        {},
    );
    const [wishlistPressCount, setWishlistPressCount] = useState<Record<string, number>>(
        {},
    );

    const getBookKey = (book: BookDto, fallbackIndex: number) =>
        (book.isbn && `isbn-${book.isbn}`) ||
        (book.coverid && `cover-${book.coverid}`) ||
        (book.bookname && `title-${book.bookname}`) ||
        `idx-${fallbackIndex}`;

    const showToast = (message: string, type: ToastType = "info") => {
        const id = nextToastId.current++;
        const newToast: Toast = { id, message, type };
        setToasts((prev) => [...prev, newToast]);

        const hideDelay = 4000;
        const fadeDuration = 500;

        setTimeout(() => {
            setToasts((prev) =>
                prev.map((t) => (t.id === id ? { ...t, closing: true } : t)),
            );
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, fadeDuration);
        }, hideDelay);
    };

    const closeToast = (id: number) => {
        const fadeDuration = 500;
        setToasts((prev) =>
            prev.map((t) => (t.id === id ? { ...t, closing: true } : t)),
        );
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, fadeDuration);
    };

    const doSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            setSearchStatus("⚠️ Please enter a book title to search.");
            setBookResults([]);
            return;
        }

        setHasSearched(true);

        setBookResults([]);
        setSearchStatus("");
        setIsSearching(true);

        try {
            const searchRes = await fetch(
                `${BASE}/googlebooks/search/${encodeURIComponent(trimmedTitle)}`,
            );

            if (!searchRes.ok) {
                throw new Error(`Search failed: ${searchRes.status}`);
            }

            const data = await searchRes.json();
            if (!data.docs || data.docs.length === 0) {
                setSearchStatus("📭 No results found. Try a different title?");
                setBookResults([]);
                return;
            }

            setBookResults(data.docs);
            setSearchStatus(
                `📚 Found ${data.docs.length} book${data.docs.length === 1 ? "" : "s"}.`,
            );
        } catch (err: any) {
            console.error("Error searching books", err);
            setSearchStatus("❌ Something went wrong while searching. Please try again.");
            setBookResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const renderBookImage = (book: BookDto) => {
        if (book.image) return book.image;
        if (book.coverid) {
            return `https://books.google.com/books/content?id=${encodeURIComponent(
                book.coverid,
            )}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`;
        }
        return noCoverFound;
    };

    // ✅ Press limit enforced here (per book key)
    const addBookToLibrary =
        (selected_book: BookDto, bookKey: string) => async (e: React.FormEvent) => {
            e.preventDefault();

            const current = libraryPressCount[bookKey] ?? 0;
            if (current >= PRESS_LIMIT) {
                showToast(
                    "Limit reached . You can’t press ‘Add to my library’ for this book anymore.",
                    "info",
                );
                return;
            }
            setLibraryPressCount((prev) => ({ ...prev, [bookKey]: current + 1 }));

            const newBook: BookDto = {
                bookname: selected_book.bookname ?? "Unknown",
                author: selected_book.author ?? "Unknown",
                isbn: selected_book.isbn ?? "Unknown",
                genre: selected_book.genre ?? "Unknown",
                coverid: selected_book.coverid ?? "Unknown",
                publication: selected_book.publication ?? "Unknown",
                pagecount: selected_book.pagecount ?? 0,
                description: selected_book.description ?? "No description available",
                image: selected_book.image,
            };

            try {
                const res = await fetch(`${BASE}/books/add`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newBook),
                });

                if (res.status === 409) {
                    const msg = await res.text();
                    showToast(msg || "This book is already in your library.", "info");
                    return;
                }

                if (!res.ok) throw new Error("Add failed: " + res.status);

                const added = await res.json();
                showToast(
                    `✅ Book added! ${added.bookname} by ${added.author} is now in your library.`,
                    "success",
                );
            } catch (err: any) {
                showToast(err?.message ?? "Error adding book to library.", "error");
            }
        };

    // ✅ Press limit enforced here (per book key)
    const addBookToWishlist =
        (selected_book: WishBookDto, bookKey: string) => async (e: React.FormEvent) => {
            e.preventDefault();

            const current = wishlistPressCount[bookKey] ?? 0;
            if (current >= PRESS_LIMIT) {
                showToast(
                    " You can’t press ‘Add to wishlist’ for this book anymore.",
                    "info",
                );
                return;
            }
            setWishlistPressCount((prev) => ({ ...prev, [bookKey]: current + 1 }));

            const newWishBook: WishBookDto = {
                bookname: selected_book.bookname ?? "Unknown",
                author: selected_book.author ?? "Unknown",
                isbn: selected_book.isbn ?? "Unknown",
                genre: selected_book.genre ?? "Unknown",
                coverid: selected_book.coverid ?? "Unknown",
                publication: selected_book.publication ?? "Unknown",
                pagecount: selected_book.pagecount ?? 0,
                description: selected_book.description ?? "No description available",
                image: selected_book.image,
            };

            try {
                const res = await fetch(`${BASE}/wishbooks/add`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newWishBook),
                });

                if (!res.ok) {
                    throw new Error("This book is already in your wishlist, or add failed");
                }

                const added = await res.json();
                showToast(`⭐ Added to wishlist: ${added.bookname} by ${added.author}.`, "success");
            } catch (err: any) {
                showToast(err?.message ?? "Error adding to wishlist.", "error");
            }
        };

    return (
        <>
            <ToastHost toasts={toasts} closeToast={closeToast} />

            <div className="relative min-h-screen">
                <div className="max-w-2xl mx-auto px-4 py-10">
                    <div className="space-y-6 p-6 shadow-md rounded-xl border border-gray-200 bg-white min-h-[220px]">
                        <div className="space-y-3">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                                Find your book
                            </h1>
                            <p className="text-base text-gray-600">
                                Search any title and explore available book details.
                            </p>
                        </div>

                        <form role="form" onSubmit={doSearch} className="space-y-4">
                            <div className="flex flex-col">
                                <label
                                    htmlFor="book-title"
                                    className="text-sm font-medium text-gray-700 mb-1"
                                >
                                    Book Title
                                </label>
                                <input
                                    id="book-title"
                                    className="input rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-pink-300 focus:outline-none"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. The Hobbit"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-full sm:w-auto bg-[#E2B4BD] hover:bg-[#DDA7B2] text-gray-900 font-semibold px-6 py-2 rounded-lg shadow-md transition-transform hover:-translate-y-[1px] cursor-pointer"
                                disabled={isSearching}
                            >
                                {isSearching ? "Searching…" : "Search"}
                            </button>
                        </form>

                        {searchStatus && !isSearching && (
                            <div className="text-sm font-medium bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-800">
                                {searchStatus}
                            </div>
                        )}
                    </div>

                    <div className="mt-10 border-t pt-8 min-h-[260px]">
                        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
                                    Search results
                                </h2>
                                {bookResults.length > 0 && !isSearching && (
                                    <p className="text-xs text-gray-500">
                                        Showing <span className="font-medium">{bookResults.length}</span>{" "}
                                        result{bookResults.length === 1 ? "" : "s"}
                                    </p>
                                )}
                            </div>
                        </div>

                        {isSearching ? (
                            <div
                                className="flex items-center justify-center w-full max-w-2xl mx-auto py-16"
                                aria-live="polite"
                            >
                                <div className="book" aria-hidden="true">
                                    <div className="book__pg-shadow" />
                                    <div className="book__pg" />
                                    <div className="book__pg book__pg--2" />
                                    <div className="book__pg book__pg--3" />
                                    <div className="book__pg book__pg--4" />
                                    <div className="book__pg book__pg--5" />
                                </div>
                                <span className="sr-only">Loading results…</span>
                            </div>
                        ) : bookResults.length === 0 && !hasSearched ? (
                            <p className="text-2xl text-gray-600">
                <span className="font-medium">
                  No results to display yet. Try searching for a title above to see
                  matching books.
                </span>
                            </p>
                        ) : bookResults.length === 0 && hasSearched ? (
                            <p className="text-lg text-gray-600">No books to show for this search.</p>
                        ) : (
                            <ul className="space-y-4 pb-10">
                                {bookResults.map((book, index) => {
                                    const key = getBookKey(book, index);

                                    const libCount = libraryPressCount[key] ?? 0;
                                    const wishCount = wishlistPressCount[key] ?? 0;

                                    const libDisabled = libCount >= PRESS_LIMIT;
                                    const wishDisabled = wishCount >= PRESS_LIMIT;

                                    return (
                                        <li
                                            key={key}
                                            className="card rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md sm:p-5 result-fade-in"
                                            style={{ animationDelay: `${index * 80}ms` }}
                                        >
                                            <div className="flex flex-col gap-4 sm:flex-row">
                                                <div className="flex justify-center sm:w-32 sm:flex-shrink-0 sm:justify-start">
                                                    {book.coverid ? (
                                                        <a
                                                            href={`https://play.google.com/store/books/details?id=${encodeURIComponent(
                                                                book.coverid,
                                                            )}&source=gbs_api`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <img
                                                                src={renderBookImage(book)}
                                                                alt={book.bookname || "Book cover"}
                                                                className="h-40 w-28 rounded-xl object-cover shadow"
                                                            />
                                                        </a>
                                                    ) : (
                                                        <img
                                                            src={renderBookImage(book)}
                                                            alt={book.bookname || "Book cover"}
                                                            className="h-40 w-28 rounded-xl object-cover shadow"
                                                        />
                                                    )}
                                                </div>

                                                <div className="flex-1 space-y-3">
                                                    <div className="space-y-1">
                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            {book.coverid ? (
                                                                <a
                                                                    href={`https://play.google.com/store/books/details?id=${encodeURIComponent(
                                                                        book.coverid,
                                                                    )}&source=gbs_api`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="hover:underline decoration-pink-300 underline-offset-4"
                                                                >
                                                                    {book.bookname || "Untitled book"}
                                                                </a>
                                                            ) : (
                                                                book.bookname || "Untitled book"
                                                            )}
                                                        </h3>

                                                        <p className="text-sm text-gray-600">
                                                            {book.author || "Unknown author"}
                                                        </p>
                                                    </div>

                                                    <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-700">
                                                        <div>
                                                            <dt className="font-medium text-gray-500 uppercase tracking-wide">
                                                                Genre
                                                            </dt>
                                                            <dd>{book.genre || "Unknown"}</dd>
                                                        </div>

                                                        <div>
                                                            <dt className="font-medium text-gray-500 uppercase tracking-wide">
                                                                Pages
                                                            </dt>
                                                            <dd>{book.pagecount ?? "Unknown"}</dd>
                                                        </div>

                                                        <div>
                                                            <dt className="font-medium text-gray-500 uppercase tracking-wide">
                                                                Publication
                                                            </dt>
                                                            <dd>{book.publication || "Unknown"}</dd>
                                                        </div>

                                                        <div>
                                                            <dt className="font-medium text-gray-500 uppercase tracking-wide">
                                                                ISBN
                                                            </dt>
                                                            <dd>{book.isbn || "N/A"}</dd>
                                                        </div>
                                                    </dl>

                                                    {book.description && (
                                                        <p className="text-sm text-gray-700 line-clamp-3">
                                                            {book.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-4 flex flex-wrap gap-3">
                                                <button
                                                    type="button"
                                                    className={`btn btn-primary bg-[#E2B4BD] hover:bg-[#DDA7B2] text-gray-900 font-medium px-4 py-2 rounded-lg shadow-md transition-transform hover:-translate-y-[1px] cursor-pointer ${
                                                        libDisabled ? "opacity-50 cursor-not-allowed hover:-translate-y-0" : ""
                                                    }`}
                                                    disabled={libDisabled}
                                                    onClick={addBookToLibrary(book, key)}
                                                >
                                                    Add to my library {libCount > 0 ? `` : ""}
                                                </button>

                                                <button
                                                    type="button"
                                                    className={`btn bg-[#8782ED] hover:bg-[#7670EB] text-white font-medium px-4 py-2 rounded-lg shadow-md transition-transform hover:-translate-y-[1px] cursor-pointer ${
                                                        wishDisabled
                                                            ? "opacity-50 cursor-not-allowed hover:-translate-y-0"
                                                            : ""
                                                    }`}
                                                    disabled={wishDisabled}
                                                    onClick={addBookToWishlist(book as WishBookDto, key)}
                                                >
                                                    Add to wishlist {wishCount > 0 ? `` : ""}
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const bookTitle = book.bookname ?? "";
                                                        const bookAuthor = book.author ?? "";
                                                        const searchQuery = `${bookTitle} ${bookAuthor}`.trim();
                                                        const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(
                                                            searchQuery,
                                                        ).replace(/%20/g, "+")}&i=stripbooks`;
                                                        window.open(amazonSearchUrl, "_blank");
                                                    }}
                                                    className="btn bg-[#ff9900] hover:bg-[#e68a00] text-white font-medium px-4 py-2 rounded-lg shadow-md transition-transform hover:-translate-y-[1px] cursor-pointer"
                                                >
                                                    Search on Amazon
                                                </button>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPage;