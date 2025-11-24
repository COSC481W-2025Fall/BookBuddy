import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { WishBookDto } from "./types/WishBookDto";
import type { BookDto } from "./types/BookDto";
import { getMyWishBook, removeFromWishlist } from "./api";
import noCoverFound from "./logo/noCoverFound.png";

type SortKey = "name" | "author" | "genre";
type SortDir = "asc" | "desc";

// Normalize a string for consistent sorting (lowercase, trim).
function norm(v?: string | null): string {
  return (v ?? "").toString().trim().toLowerCase();
}

// Generic comparator for two strings, putting empties at the end.
function compareStr(
  a?: string | null,
  b?: string | null,
  dir: SortDir = "asc"
) {
  const aa = norm(a);
  const bb = norm(b);
  if (!aa && !bb) return 0;
  if (!aa) return 1; // empty goes after non-empty
  if (!bb) return -1;
  const res = aa.localeCompare(bb, undefined, { sensitivity: "base" });
  return dir === "asc" ? res : -res;
}

// Amazon search URL builder
const amazonSearchUrl = (title?: string | null) => {
  const safeTitle = title ?? "";
  return `https://www.amazon.com/s?k=${encodeURIComponent(
    safeTitle
  ).replace(/%20/g, "+")}&i=stripbooks`;
};

// Google Play Books URL builder (by coverid)
const playStoreUrl = (coverid?: string | null) =>
  coverid
    ? `https://play.google.com/store/books/details?id=${encodeURIComponent(
        coverid
      )}`
    : "";

export default function WishBook() {
  const navigate = useNavigate();

  const [wishbooks, setWishBooks] = useState<WishBookDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // sort UI state
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  // helper to add a wishbook as a regular library Book
  async function addToLibraryFromWishBook(w: WishBookDto): Promise<void> {
    const newBook: BookDto = {
      bookname: w.bookname ?? "Unknown",
      author: w.author ?? "Unknown",
      isbn: w.isbn ?? "Unknown",
      genre: w.genre ?? "Unknown",
      coverid: w.coverid ?? "Unknown",
      publication: w.publication ?? "Unknown",
      pagecount: w.pagecount ?? 0,
      description: w.description ?? "No description available",
    };

    const res = await fetch(`/books/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });

    if (!res.ok) {
      throw new Error("Failed to add to library");
    }
  }

  // cover retrieval using Google Books coverid
  const coverUrl = (coverid?: string | null) =>
    coverid
      ? `https://books.google.com/books/content?id=${coverid}&fife=w400-h600&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`
      : (noCoverFound as string);

  // on component load, fetch the user's wishlist
  useEffect(() => {
    (async () => {
      try {
        const data = await getMyWishBook();
        setWishBooks(Array.isArray(data) ? data : []);
      } catch (e: any) {
        if (e?.message === "AUTH") {
          navigate("/login");
          return;
        }
        setError(e?.message ?? "Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  // Compute a sorted view of wishbooks based on current controls.
  const sortedWishBooks = useMemo(() => {
    return wishbooks
      .map((b, i) => ({ b, i }))
      .sort((x, y) => {
        let primary = 0;
        switch (sortKey) {
          case "name":
            primary = compareStr(x.b.bookname, y.b.bookname, sortDir);
            break;
          case "author":
            primary = compareStr(x.b.author, y.b.author, sortDir);
            break;
          case "genre":
            primary = compareStr(x.b.genre, y.b.genre, sortDir);
            break;
        }
        if (primary !== 0) return primary;

        // Secondary keys for nicer grouping
        const byName = compareStr(x.b.bookname, y.b.bookname, "asc");
        if (byName !== 0) return byName;
        const byAuthor = compareStr(x.b.author, y.b.author, "asc");
        if (byAuthor !== 0) return byAuthor;

        // Stable fallback
        return x.i - y.i;
      })
      .map((entry) => entry.b);
  }, [wishbooks, sortKey, sortDir]);

  // render loading, error, or the wishlist
  if (loading) {
    return (
      <div className="min-h-[60vh] bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-16">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            My Wishlist
          </h1>
          <p className="mt-4 text-sm text-slate-500">
            Loading your wishlist…
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              My Wishlist
            </h1>
          </div>

          <div
            className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {error}
          </div>

          <button
            className="mt-6 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            onClick={() => navigate("/search")}
          >
            Go to Search
          </button>
        </div>
      </div>
    );
  }

  // Main wishlist display
  return (
    <div className="min-h-[60vh] bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              My Wishlist
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Keep track of the books you&apos;d love to read next.
            </p>
          </div>

          {/* Sort controls */}
          <div
            className="flex flex-wrap items-center gap-3"
            aria-label="Sort options"
          >
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Sort by
              </span>
              <select
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
              >
                <option value="name">Name (Title)</option>
                <option value="author">Author</option>
                <option value="genre">Genre</option>
              </select>
            </label>

            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              onClick={() =>
                setSortDir((d) => (d === "asc" ? "desc" : "asc"))
              }
              aria-label={`Toggle sort direction, currently ${
                sortDir === "asc" ? "ascending" : "descending"
              }`}
              title={`Sort ${sortDir === "asc" ? "A→Z" : "Z→A"}`}
            >
              <span>{sortDir === "asc" ? "A→Z" : "Z→A"}</span>
            </button>
          </div>
        </div>

        {sortedWishBooks.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
            <p className="text-sm text-slate-600">
              You haven&apos;t added any books to your wishlist yet.
            </p>
            <button
              className="mt-6 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              onClick={() => navigate("/search")}
            >
              Search for books
            </button>
          </div>
        ) : (
          <ul
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            aria-label="Your saved wishbooks"
          >
            {sortedWishBooks.map((b, i) => (
              <li
                key={(b.isbn ?? "no-isbn") + "-" + i}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[2/3] w-full bg-slate-100">
                  <img
                    src={coverUrl(b.coverid)}
                    alt={`${b.bookname ?? "WishBook"} cover`}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/hobbit-placeholder.jpg";
                    }}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h2 className="text-base font-semibold text-slate-900">
                    {b.bookname || "Untitled"}
                  </h2>

                  {b.author && (
                    <div className="text-sm text-slate-600">{b.author}</div>
                  )}

                  {(b.isbn || b.genre) && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {b.isbn && (
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                          ISBN: {b.isbn}
                        </span>
                      )}
                      {b.genre && (
                        <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                          {b.genre}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Actions pinned to the bottom */}
                  <div className="mt-auto pt-2 flex flex-col gap-2">
                    {b.coverid && (
                      <a
                        href={playStoreUrl(b.coverid)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                      >
                        Description
                      </a>
                    )}

                    <a
                      href={amazonSearchUrl(b.bookname)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center rounded-lg bg-amber-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                    >
                      View on Amazon
                    </a>

                    {b.isbn && (
                      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:gap-3">
                        <button
                          type="button"
                          className="inline-flex flex-1 items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                          onClick={async () => {
                            try {
                              await removeFromWishlist(b.isbn!);
                              setWishBooks((prev) =>
                                prev.filter((w) => w.isbn !== b.isbn)
                              );
                            } catch (err: any) {
                              alert(
                                err?.message ??
                                  "Failed to remove from wishlist"
                              );
                            }
                          }}
                        >
                          Remove
                        </button>

                        <button
                          type="button"
                          className="inline-flex flex-1 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                          onClick={async () => {
                            try {
                              await addToLibraryFromWishBook(b);
                              await removeFromWishlist(b.isbn!);
                              setWishBooks((prev) =>
                                prev.filter((w) => w.isbn !== b.isbn)
                              );
                            } catch (err: any) {
                              alert(
                                err?.message ??
                                  "Failed to move book to library"
                              );
                            }
                          }}
                        >
                          Add to Library
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
