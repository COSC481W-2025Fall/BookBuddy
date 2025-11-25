import React, { useState, useRef } from "react";
import type { BookDto } from "./types/BookDto";
import type { WishBookDto } from "./types/WishBookDto";
import "./components/Searchpage.css";
import noCoverFound from "./logo/noCoverFound.png";

const BASE = ""; // keep empty, proxy or relative path handles backend

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

  // ------- TOAST STATE (STACKED) --------
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextToastId = useRef(1);

  const showToast = (message: string, type: ToastType = "info") => {
    const id = nextToastId.current++;
    const newToast: Toast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    // auto-dismiss after 4s with fade-out
    const hideDelay = 4000;
    const fadeDuration = 500;

    setTimeout(() => {
      // mark as closing (fade + slide)
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, closing: true } : t)),
      );

      // remove from DOM after animation
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

  // ------- SEARCH LOGIC --------
  const doSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setSearchStatus("⚠️ Please enter a book title to search.");
      setBookResults([]);
      return;
    }

    setSearchStatus("🔎 Searching…");

    try {
      const searchRes = await fetch(
        `${BASE}/googlebooks/search/${encodeURIComponent(title.trim())}`,
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
        `📚 Found ${data.docs.length} book${
          data.docs.length === 1 ? "" : "s"
        }.`,
      );
    } catch (err: any) {
      console.error("Error searching books", err);
      setSearchStatus("❌ Something went wrong while searching. Please try again.");
      setBookResults([]);
    }
  };

  // ------- RESULT HELPERS --------
  const renderBookImage = (book: BookDto) => {
    if (book.image) {
      return book.image;
    }
    if (book.coverid) {
      return `https://books.google.com/books/content?id=${encodeURIComponent(
        book.coverid,
      )}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`;
    }
    return noCoverFound;
  };

  const addBookToLibrary =
    (selected_book: BookDto) => async (e: React.FormEvent) => {
      e.preventDefault();

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
        console.log("Book saved to DB:", added);
        showToast(
          `✅ Book added! ${added.bookname} by ${added.author} is now in your library.`,
          "success",
        );
      } catch (err: any) {
        console.error("Add book error:", err);
        showToast(
          err?.message ?? "Error adding book to library.",
          "error",
        );
      }
    };

  const addBookToWishlist =
    (selected_book: WishBookDto) => async (e: React.FormEvent) => {
      e.preventDefault();

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
          throw new Error(
            "This book is already in your wishlist, or add failed",
          );
        }

        const added = await res.json();
        console.log("Book added to wishlist:", added);
        showToast(
          `⭐ Added to wishlist: ${added.bookname} by ${added.author}.`,
          "success",
        );
      } catch (err: any) {
        console.error("Wishlist error:", err);
        showToast(
          err?.message ?? "Error adding to wishlist.",
          "error",
        );
      }
    };

  // ------- RENDER --------
  return (
    <>
      {/* Toast stack */}
      {toasts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={[
                "w-80 sm:w-96 rounded-xl shadow-2xl px-5 py-4 text-base text-white flex items-start gap-3",
                "transition-all duration-500 transform",
                toast.closing
                  ? "opacity-0 translate-y-2"
                  : "opacity-100 translate-y-0",
                toast.type === "success"
                  ? "bg-emerald-500"
                  : toast.type === "error"
                  ? "bg-rose-500"
                  : "bg-slate-800",
              ].join(" ")}
            >
              <span className="mt-0.5 text-lg">
                {toast.type === "success"
                  ? "✨"
                  : toast.type === "error"
                  ? "⚠️"
                  : "ℹ️"}
              </span>
              <p className="flex-1 leading-snug">{toast.message}</p>
              <button
                type="button"
                onClick={() => closeToast(toast.id)}
                className="ml-2 text-xs opacity-70 hover:opacity-100 whitespace-nowrap"
              >
                Close
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Search panel */}
        <div className="w-full space-y-6 p-6 shadow-md rounded-xl border border-gray-200 bg-white min-h-[220px]">
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
              className="btn btn-primary w-full sm:w-auto bg-[#E2B4BD] hover:bg-[#DDA7B2] text-gray-900 font-semibold px-6 py-2 rounded-lg shadow-md transition-transform hover:-translate-y-[1px]"
            >
              Search
            </button>
          </form>

          {searchStatus && (
            <div className="text-sm font-medium bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-800">
              {searchStatus}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mt-10 border-t pt-8">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                Search results
              </h2>
              {bookResults.length > 0 && (
                <p className="text-xs text-gray-500">
                  Showing{" "}
                    <span className="font-medium">{bookResults.length}</span>{" "}
                  result{bookResults.length === 1 ? "" : "s"}
                </p>
              )}
            </div>
          </div>

          {bookResults.length === 0 ? (
            <p className="text-sm text-gray-600">
              No results to display yet. Try searching for a title above to see
              matching books.
            </p>
          ) : (
            <ul className="space-y-4">
              {bookResults.map((book, index) => (
                <li
                  key={book.isbn ?? book.bookname ?? index}
                  className="card rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md sm:p-5 result-fade-in"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="flex flex-col gap-4 sm:flex-row">
                    {/* Cover */}
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

                    {/* Text content */}
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

                      {/* Meta info */}
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

                  {/* Actions */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="btn btn-primary bg-[#E2B4BD] hover:bg-[#DDA7B2] text-gray-900 font-medium px-4 py-2 rounded-lg shadow-md transition-transform hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-pink-200"
                      onClick={addBookToLibrary(book)}
                    >
                      Add to my library
                    </button>
                    <button
                      type="button"
                      className="btn bg-[#8782ED] hover:bg-[#7670EB] text-white font-medium px-4 py-2 rounded-lg shadow-md transition-transform hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      onClick={addBookToWishlist(book as WishBookDto)}
                    >
                      Add to wishlist
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const bookTitle = book.bookname ?? "";
                        const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(
                          bookTitle,
                        ).replace(/%20/g, "+")}&i=stripbooks`;

                        window.open(amazonSearchUrl, "_blank");
                      }}
                      className="btn bg-[#ff9900] hover:bg-[#e68a00] text-white font-medium px-4 py-2 rounded-lg shadow-md transition-transform hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-amber-200"
                    >
                      Search on Amazon
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
