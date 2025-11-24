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
      setStatus("Adding book to your library…");

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
          setStatus(msg || "This book is already in your library.");
          return;
        }

        if (!res.ok) throw new Error("Add failed: " + res.status);

        const added = await res.json();
        console.log("Book saved to DB:", added);
        setStatus(
          `✅ Book added! ${added.bookname} by ${added.author} is now in your library.`,
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

        if (!res.ok) throw new Error("This book is already in your wishlist, or add failed");

        const added = await res.json();
        console.log("Book added to wishlist:", added);
        setStatus(
          `⭐ Added to wishlist: ${added.bookname} by ${added.author}.`,
        );
      } catch (err: any) {
        console.error("Wishlist error:", err);
        setStatus(err?.message ?? "Error adding to wishlist.");
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
    return "./logo/noCoverFound.png";
  };

  return (
    <div className="">
      {/* Header / status */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            Search results
          </h2>
          {result.length > 0 && (
            <p className="text-xs text-gray-500">
              Showing <span className="font-medium">{result.length}</span>{" "}
              result{result.length === 1 ? "" : "s"}
            </p>
          )}
        </div>

        {status && (
          <div
            className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 shadow-sm"
            role="status"
          >
            {status}
          </div>
        )}
      </div>

      {/* Empty state */}
      {result.length === 0 ? (
        <p className="text-sm text-gray-600">
          No results to display yet. Try searching for a title above to see
          matching books.
        </p>
      ) : (
        <ul className="space-y-4">
          {result.map((book, index) => (
            <li
              key={book.isbn ?? book.bookname}
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
                  onClick={add_book_to_library(book)}
                >
                  Add to my library
                </button>
                <button
                  type="button"
                  className="btn bg-[#8782ED] hover:bg-[#7670EB] text-white font-medium px-4 py-2 rounded-lg shadow-md transition-transform hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  onClick={add_book_to_wishlist(book as WishBookDto)}
                >
                  Add to wishlist
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const title = book.bookname ?? "";
                    const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(
                      title,
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
  );
}
