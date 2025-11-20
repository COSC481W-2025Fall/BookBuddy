import { useNavigate } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import type { WishBookDto } from "./types/WishBookDto";
import { getMyWishBook } from "./api";
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

export default function WishWishBook() {
  const navigate = useNavigate();

  const [wishbooks, setWishBooks] = useState<WishBookDto[]>([]);
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

  if (loading) {
    return (
      <div className="bb-lib wrap">
        <h1 className="bb-lib__title">My WishList</h1>
        <p className="bb-lib__status">Loading your wishbooks…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bb-lib wrap">
        <h1 className="bb-lib__title">My WishList</h1>
        <div className="bb-lib__error" role="alert">
          {error}
        </div>
        <button className="bb-btn" onClick={() => navigate("/search")}>
          Go to Search
        </button>
      </div>
    );
  }

  // Main wishlist display
  return (
    <div className="bb-lib wrap">
      <div className="bb-lib__header">
        <h1 className="bb-lib__title">My WishList</h1>

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

      {sortedWishBooks.length === 0 ? (
        <div className="bb-empty">
          <p>You haven't added any wishbooks yet.</p>
          <button className="bb-btn" onClick={() => navigate("/search")}>
            Search for wishbooks
          </button>
        </div>
      ) : (
        <ul className="bb-grid" aria-label="Your saved wishbooks">
          {sortedWishBooks.map((b, i) => (
            <li
              key={(b.isbn ?? "no-isbn") + "-" + i}
              className="bb-card"
            >
              <div className="bb-card__media">
                <img
                  src={coverUrl(b.coverid)}
                  alt={`${b.bookname ?? "WishBook"} cover`}
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
                <h2 className="bb-card__title">{b.bookname || "Untitled"}</h2>
                {b.author && (
                  <div className="bb-card__meta">{b.author}</div>
                )}
                {(b.isbn || b.genre) && (
                  <div className="bb-card__tags">
                    {b.isbn && (
                      <span className="bb-tag">ISBN: {b.isbn}</span>
                    )}
                    {b.genre && <span className="bb-tag">{b.genre}</span>}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
