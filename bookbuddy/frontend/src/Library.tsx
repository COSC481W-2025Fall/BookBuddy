import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { BookDto } from "./types/BookDto";
import { getMyLibrary } from "./api";
import { removeFromLibrary } from "./api";
import "./components/Library.css";
import "./logo/noCoverFound.png";

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

export default function Library() {
  const navigate = useNavigate();

  const [books, setBooks] = useState<BookDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // sort UI state
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  // cover retrieval using Google Books coverid
  const coverUrl = (coverid?: string) =>
    coverid
      ? `https://books.google.com/books/content?id=${coverid}&fife=w400-h600&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`
      : "./logo/noCoverFound.png";

  useEffect(() => {
    (async () => {
      try {
        const data = await getMyLibrary();
        setBooks(Array.isArray(data) ? data : []);
      } catch (e: any) {
        if (e?.message === "AUTH") {
          navigate("/login");
          return;
        }
        setError(e?.message ?? "Failed to load library");
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  // Compute a sorted view of books based on current controls.
  const sortedBooks = useMemo(() => {
    // Stable sort with index as tiebreaker
    return books
      .map((b, i) => ({ b, i }))
      .sort((x, y) => {
        // Primary key
        let primary = 0;
        switch (sortKey) {
          case "name":
            primary = compareStr(x.b.bookname, y.b.bookname, sortDir);
            break;
          case "author":
            primary = compareStr(x.b.author, y.b.author, sortDir);
            break;
          case "genre":
            primary = compareStr(
              (x.b as any).genre,
              (y.b as any).genre,
              sortDir
            );
            break;
        }
        if (primary !== 0) return primary;

        // Secondary keys (for nicer grouping)
        const byName = compareStr(x.b.bookname, y.b.bookname, "asc");
        if (byName !== 0) return byName;
        const byAuthor = compareStr(x.b.author, y.b.author, "asc");
        if (byAuthor !== 0) return byAuthor;

        // Stable fallback
        return x.i - y.i;
      })
      .map((entry) => entry.b);
  }, [books, sortKey, sortDir]);

  if (loading) {
    return (
      <div className="bb-lib wrap">
        <h1 className="bb-lib__title">My Library</h1>
        <p className="bb-lib__status">Loading your books…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bb-lib wrap">
        <h1 className="bb-lib__title">My Library</h1>
        <div className="bb-lib__error" role="alert">
          {error}
        </div>
        <button className="bb-btn" onClick={() => navigate("/search")}>
          Go to Search
        </button>
      </div>
    );
  }

  return (
    <div className="bb-lib wrap">
      <div className="bb-lib__header">
        <h1 className="bb-lib__title">My Library</h1>

        {/* Sort controls */}
        <div className="bb-lib__controls" aria-label="Sort options">
          <label className="bb-field">
            <span className="bb-field__label">Sort by</span>
            <select
              className="bb-select"
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
            className="bb-btn bb-btn--ghost"
            onClick={() =>
              setSortDir((d) => (d === "asc" ? "desc" : "asc"))
            }
            aria-label={`Toggle sort direction, currently ${
              sortDir === "asc" ? "ascending" : "descending"
            }`}
            title={`Sort ${sortDir === "asc" ? "A→Z" : "Z→A"}`}
          >
            {sortDir === "asc" ? "A→Z" : "Z→A"}
          </button>
        </div>
      </div>

      {sortedBooks.length === 0 ? (
        <div className="bb-empty">
          <p>You haven't added any books yet.</p>
          <button className="bb-btn" onClick={() => navigate("/search")}>
            Search for books
          </button>
        </div>
      ) : (
        <ul className="bb-grid" aria-label="Your saved books">
          {sortedBooks.map((b, i) => (
            <li
              key={(b.isbn ?? "no-isbn") + "-" + i}
              className="bb-card"
            >
              <div className="bb-card__media">
                {/* Book cover image with fallback on error */}
                <img
                  src={coverUrl((b as any).coverid)}
                  alt={`${b.bookname ?? "Book"} cover`}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/hobbit-placeholder.jpg";
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <div className="bb-card__body">
                {/* Book title */}
                <h2 className="bb-card__title">
                  {b.bookname || "Untitled"}
                </h2>

                {/* Author */}
                {b.author && (
                  <div className="bb-card__meta">{b.author}</div>
                )}

                {/* ISBN + Genre tags */}
                {(b.isbn || (b as any).genre) && (
                  <div className="bb-card__tags">
                    {b.isbn && (
                      <span className="bb-tag">ISBN: {b.isbn}</span>
                    )}
                    {(b as any).genre && (
                      <span className="bb-tag">
                        {(b as any).genre}
                      </span>
                    )}
                  </div>
                )}
                <button
                  className="bb-btn bb-btn--danger"
                  style={{ marginTop: "10px" }}
                  onClick={async () => {
                    try {
                      await removeFromLibrary(b.isbn!);
                      setBooks(books.filter(book => book.isbn !== b.isbn));
                    } catch (err: any) {
                      alert(err.message ?? "Failed to remove book");
                    }
                  }}
                >
                  Remove
                </button>

              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
