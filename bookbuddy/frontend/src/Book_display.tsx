import React, { useState } from "react";
import type { BookDto } from "./types/BookDto";
import { WishBookDto } from "./types/WishBookDto";
import "./components/Searchpage.css";
import "./logo/noCoverFound.png";

const BASE = ""; // keep empty, proxy or relative path handles backend

type Props = {
  result: BookDto[];
};

export default function Book_display({ result }: Props) {
  const [status, setStatus] = useState<string>("");

  // Add the selected book to the user's main library
  function add_book_to_library(selected_book: BookDto) {
    return async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus("Added book to library…");

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

        // handles case where book already exists in user’s library
        if (res.status === 409) {
          const msg = await res.text();
          setStatus(msg || "Book already exists in user's library.");
          return;
        }

        if (!res.ok) throw new Error("Add failed: " + res.status);

        const added = await res.json(); // backend now returns JSON via Map.of()
        console.log("Book saved to DB:", added);
        setStatus(
          `Book added! ${added.bookname} by ${added.author} is now in your library!`,
        );
      } catch (err: any) {
        console.error("Add book error:", err);
        setStatus(err?.message ?? "Error adding book to library.");
      }
    };
  }

  // Add the selected book to the user's wishlist
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
        description:
          selected_book.description ?? "No description available",
        image: selected_book.image,
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
        setStatus(
          `Added to wishlist: ${added.bookname} by ${added.author}`,
        );
      } catch (err: any) {
        console.error("Wishlist error:", err);
        setStatus(err?.message ?? "Error adding to wishlist");
      }
    };
  }

  // Choose which image to show for a book
  const renderBookImage = (book: BookDto) => {
    if (book.image) {
      return book.image;
    }
    if (book.coverid) {
      return `https://books.google.com/books/content?id=${book.coverid}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`;
    }
    // falls back to the local "no cover" asset (already imported above)
    return "./logo/noCoverFound.png";
  };

  return (
    <div className="mt-10">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">
          Search results
        </h2>
        {status && (
          <p className="text-sm text-indigo-700" role="status">
            {status}
          </p>
        )}
      </div>

      {result.length === 0 ? (
        <p className="text-sm text-gray-600">
          No results to display. Try searching for something!
        </p>
      ) : (
        <ul className="space-y-4">
          {result.map((book) => (
            <li key={book.isbn ?? book.bookname} className="card">
              <div className="flex flex-col gap-4 sm:flex-row">
                {/* Cover */}
                <div className="sm:w-32 sm:flex-shrink-0 flex justify-center sm:justify-start">
                  <img
                    src={renderBookImage(book)}
                    alt={book.bookname || "Book cover"}
                    className="h-40 w-28 rounded-xl object-cover shadow"
                  />
                </div>

                {/* Text content */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {book.bookname || "Untitled book"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {book.author || "Unknown author"}
                    </p>
                  </div>

                  <dl className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-1 text-sm text-gray-700">
                    <dt className="font-medium">Genre: {book.genre || "Unknown"}</dt>

                    <dt className="font-medium">Pages: {book.pagecount ?? "Unknown"}</dt>

                    <dt className="font-medium">Publication: {book.publication || "Unknown"}</dt>

                    <dt className="font-medium">ISBN: {book.isbn || "N/A"}</dt>
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
                  className="btn btn-primary"
                  onClick={add_book_to_library(book)}
                >
                  Add to my library
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={add_book_to_wishlist(book as WishBookDto)}
                >
                  Add to wishlist
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const title = book.bookname ?? "";
                    const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(
                      title
                    ).replace(/%20/g, "+")}`;

                    window.open(amazonSearchUrl, "_blank");
                  }}
                  className="bg-[#ff9900] hover:bg-[#e68a00] text-white font-medium px-4 py-2 rounded-md shadow"
                >
                  Search on Amazon
                </button>

              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
