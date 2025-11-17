import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { WishBookDto } from "./types/WishBookDto";
import { getMyWishBook, removeFromWishlist } from "./api";
import "./components/Library.css";

type SortKey = "name" | "author" | "genre";
type SortDir = "asc" | "desc";

// Normalize string for consistent sorting
function norm(v?: string | null): string {
  return (v ?? "").toString().trim().toLowerCase();
}

function compareStr(a?: string | null, b?: string | null, dir: SortDir = "asc") {
  const aa = norm(a);
  const bb = norm(b);
  if (!aa && !bb) return 0;
  if (!aa) return 1;
  if (!bb) return -1;
  const res = aa.localeCompare(bb, undefined, { sensitivity: "base" });
  return dir === "asc" ? res : -res;
}

export default function WishWishBook() {
  const navigate = useNavigate();
  const [wishbooks, setWishBooks] = useState<WishBookDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const coverUrl = (coverid?: string) =>
    coverid
      ? `https://books.google.com/books/content?id=${coverid}&fife=w400-h600&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`
      : "./logo/noCoverFound.png";

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

  // Sorted wishlist
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
            primary = compareStr((x.b as any).genre, (y.b as any).genre, sortDir);
            break;
        }
        if (primary !== 0) return primary;

        // secondary grouping
        const byName = compareStr(x.b.bookname, y.b.bookname);
        if (byName !== 0) return byName;
        const byAuthor = compareStr(x.b.author, y.b.author);
        if (byAuthor !== 0) return byAuthor;

        return x.i - y.i;
      })
      .map((entry) => entry.b);
  }, [wishbooks, sortKey, sortDir]);

  if (loading) {
    return (
      <div className="bb-lib wrap">
        <h1 className="bb-lib__title">My Wishlist</h1>
        <p className="bb-lib__status">Loading your wishlist…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bb-lib wrap">
        <h1 className="bb-lib__title">My Wishlist</h1>
        <div className="bb-lib__error" role="alert">{error}</div>
        <button className="bb-btn" onClick={() => navigate("/search")}>Go to Search</button>
      </div>
    );
  }

  return (
    <div className="bb-lib wrap">
      <div className="bb-lib__header">
        <h1 className="bb-lib__title">My Wishlist</h1>

        {/* sort controls */}
        <div className="bb-lib__controls">
          <label className="bb-field">
            <span className="bb-field__label">Sort by</span>
            <select
              className="bb-select"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
            >
              <option value="name">Name</option>
              <option value="author">Author</option>
              <option value="genre">Genre</option>
            </select>
          </label>

          <button
            className="bb-btn bb-btn--ghost"
            onClick={() => setSortDir(d => d === "asc" ? "desc" : "asc")}
          >
            {sortDir === "asc" ? "A→Z" : "Z→A"}
          </button>
        </div>
      </div>

      {sortedWishBooks.length === 0 ? (
        <div className="bb-empty">
          <p>Your wishlist is empty.</p>
          <button className="bb-btn" onClick={() => navigate("/search")}>
            Search for books
          </button>
        </div>
      ) : (
        <ul className="bb-grid">
          {sortedWishBooks.map((b, i) => (
            <li key={(b.isbn ?? "no-isbn") + "-" + i} className="bb-card">
              <div className="bb-card__media">
                <img
                  src={coverUrl(b.coverid)}
                  alt={`${b.bookname ?? "WishBook"} cover`}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/hobbit-placeholder.jpg";
                  }}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div className="bb-card__body">
                <h2 className="bb-card__title">{b.bookname || "Untitled"}</h2>
                {b.author && <div className="bb-card__meta">{b.author}</div>}

                {(b.isbn || b.genre) && (
                  <div className="bb-card__tags">
                    {b.isbn && <span className="bb-tag">ISBN: {b.isbn}</span>}
                    {b.genre && <span className="bb-tag">{b.genre}</span>}
                  </div>
                )}

                {/* REMOVE BUTTON */}
                <button
                  className="bb-btn bb-btn--danger"
                  style={{ marginTop: "10px" }}
                  onClick={async () => {
                    try {
                      await removeFromWishlist(b.isbn!);
                      setWishBooks(wishbooks.filter(w => w.isbn !== b.isbn));
                    } catch (err: any) {
                      alert(err.message ?? "Failed to remove from wishlist");
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
