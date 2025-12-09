import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import type { WishBookDto } from "./types/WishBookDto";
import type { BookDto } from "./types/BookDto";
import { getMyWishBook, removeFromWishlist } from "./api";
import noCoverFound from "./logo/noCoverFound.png";
import { TrashIcon } from "@heroicons/react/24/solid";
import ModalPortal from "./ModalPortal";

type SortKey = "name" | "author" | "genre";
type SortDir = "asc" | "desc";

// Normalize a string
function norm(v?: string | null): string {
  return (v ?? "").toString().trim().toLowerCase();
}

// Sort helper
function compareStr(a?: string | null, b?: string | null, dir: SortDir = "asc") {
  const aa = norm(a);
  const bb = norm(b);
  if (!aa && !bb) return 0;
  if (!aa) return 1;
  if (!bb) return -1;
  const res = aa.localeCompare(bb, undefined, { sensitivity: "base" });
  return dir === "asc" ? res : -res;
}

const amazonSearchUrl = (
  title?: string | null,
  author?: string | null
) => {
  const searchQuery = `${title ?? ""} ${author ?? ""}`.trim();
  return `https://www.amazon.com/s?k=${encodeURIComponent(searchQuery).replace(
    /%20/g,
    "+"
  )}&i=stripbooks`;
};

// Helper to chunk an array into rows
function chunkArray<T>(items: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
}

type DescriptionModalProps = {
  book: WishBookDto;
  onClose: () => void;
  coverUrl: (coverid?: string | null) => string;
  amazonSearchUrl: (title?: string | null) => string;
};

function DescriptionModal({
  book,
  onClose,
  coverUrl,
  amazonSearchUrl,
}: DescriptionModalProps) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-h-[80vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          className="absolute right-3 top-3 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200 cursor-pointer"
          onClick={onClose}
        >
          Close
        </button>

        <div className="flex gap-4 border-b border-slate-100 p-4">
          <div className="h-24 w-16 flex-shrink-0 overflow-hidden rounded-md bg-slate-100">
            <img
              src={coverUrl(book.coverid)}
              alt={`${book.bookname ?? "Book"} cover`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-1">
            <h2 className="text-lg font-semibold text-slate-900">
              {book.bookname || "Untitled"}
            </h2>
            {book.author && (
              <p className="text-sm text-slate-600">{book.author}</p>
            )}
            {book.genre && (
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {book.genre}
              </p>
            )}
          </div>
        </div>

        <div className="max-h-[48vh] overflow-y-auto px-4 py-3 text-sm text-slate-700">
          {book.description
            ? book.description
            : "No description available for this book."}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-4 py-3">
          <a
            href={amazonSearchUrl(book.bookname)}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-amber-500 px-3 py-2 text-xs font-medium text-white shadow-sm hover:bg-amber-400"
          >
            View on Amazon
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function WishBook() {
  const navigate = useNavigate();

  const [wishbooks, setWishBooks] = useState<WishBookDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  // Which book's description is currently open in a modal
  const [descriptionBook, setDescriptionBook] = useState<WishBookDto | null>(
    null
  );
  useEffect(() => {
  if (descriptionBook) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}, [descriptionBook]);


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

    if (!res.ok) throw new Error("Failed to add to library");
  }

  const coverUrl = (coverid?: string | null) =>
    coverid
      ? `https://books.google.com/books/content?id=${coverid}&fife=w400-h600&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`
      : (noCoverFound as string);

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
        const byName = compareStr(x.b.bookname, y.b.bookname, "asc");
        if (byName !== 0) return byName;
        const byAuthor = compareStr(x.b.author, y.b.author, "asc");
        if (byAuthor !== 0) return byAuthor;
        return x.i - y.i;
      })
      .map((entry) => entry.b);
  }, [wishbooks, sortKey, sortDir]);

  if (loading) {
    return (
      <div className="min-h-[60vh] bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-16">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            My Wishlist
          </h1>
          <p className="mt-4 text-sm text-slate-500">Loading your wishlist…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            My Wishlist
          </h1>
          <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
          <button
            className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 cursor-pointer"
            onClick={() => navigate("/search")}
          >
            Go to Search
          </button>
        </div>
      </div>
    );
  }

  // Build card items so we can chunk them into rows
  const cardItems = sortedWishBooks.map((b, i) => (
    <li
      key={(b.isbn ?? "no-isbn") + "-" + i}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Trash icon on hover */}
      {b.isbn && (
        <button
          type="button"
          onClick={async () => {
            try {
              await removeFromWishlist(b.isbn!);
              setWishBooks((prev) => prev.filter((w) => w.isbn !== b.isbn));
            } catch (err: any) {
              alert(err?.message ?? "Failed to remove from wishlist");
            }
          }}
          className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-2 text-red-600 opacity-0 shadow transition hover:bg-white hover:text-red-700 focus-visible:ring-2 focus-visible:ring-red-500 group-hover:opacity-100  cursor-pointer"
          title="Remove from Wishlist"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      )}

      <div className="relative w-full h-108 bg-slate-100 flex items-center justify-center overflow-hidden">
        <img
          src={coverUrl(b.coverid)}
          alt={`${b.bookname ?? "WishBook"} cover`}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/hobbit-placeholder.jpg";
          }}
          className="h-full w-auto object-cover"
        />
      </div>


      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="text-base font-semibold text-slate-900">
          {b.bookname || "Untitled"}
        </h2>

        {b.author && <div className="text-sm text-slate-600">{b.author}</div>}

        {(b.isbn || b.genre) && (
          <div className="mt-2 flex flex-wrap gap-2">
            {b.isbn && (
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                ISBN: {b.isbn}
              </span>
            )}
            {b.genre && (
              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                {b.genre}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto flex flex-col gap-2 pt-2">
          {/* Add to Library */}
          {b.isbn && (
            <button
              type="button"
              className="flex items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
              onClick={async () => {
                try {
                  await addToLibraryFromWishBook(b);
                  await removeFromWishlist(b.isbn!);
                  setWishBooks((prev) => prev.filter((w) => w.isbn !== b.isbn));
                } catch (err: any) {
                  alert(err?.message ?? "Failed to move book to library");
                }
              }}
            >
              Add to Library
            </button>
          )}

          {/* Description (modal) + Amazon */}
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <button
              type="button"
              onClick={() => setDescriptionBook(b)}
              className="flex flex-1 items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 cursor-pointer"
            >
              Description
            </button>

            <a
              href={amazonSearchUrl(b.bookname, b.author)}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center rounded-lg bg-amber-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-400 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 cursor-pointer"
            >
              Amazon
            </a>
          </div>
        </div>
      </div>
    </li>
  ));

  const rows = chunkArray(cardItems, 4); // 4 per row for lg:grid-cols-4 layout

  return (
    <>
      <div className="min-h-[60vh] bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-none flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between min-w-[1120px]">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                My Wishlist
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Keep track of the books you'd love to read next.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <span className="text-xs font-medium uppercase text-slate-500">
                  Sort by
                </span>
                <select
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm cursor-pointer"
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
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 cursor-pointer"
                onClick={() =>
                  setSortDir((d) => (d === "asc" ? "desc" : "asc"))
                }
              >
                {sortDir === "asc" ? "A→Z" : "Z→A"}
              </button>
            </div>
          </div>

          {sortedWishBooks.length === 0 ? (
            <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1">
              <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
                <p className="text-sm text-slate-600">
                  You haven't added any books to your wishlist yet.
                </p>
                <button
                  className=" mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 cursor-pointer"
                  onClick={() => navigate("/search")}
                >
                  Search for books
                </button>
              </div>
            </ul>
          ) : (
            // Books present: bookshelf grid with shelf under each row
            <ul className="mt-8 space-y-10">
              {rows.map((row, rowIndex) => (
                <li key={`row-${rowIndex}`} className="relative list-none">
                  <ul className="grid grid-cols-1 gap-6 pb-6 sm:grid-cols-2 lg:grid-cols-4">
                    {row}
                  </ul>

                  {/* Shelf bar under this row */}
                  <div className="pointer-events-none absolute inset-x-4 bottom-0 h-3 rounded-t-2xl bg-gradient-to-b from-amber-200 via-amber-300 to-amber-500 shadow-[0_10px_20px_rgba(15,23,42,0.45)]" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Description Modal via portal */}
      {descriptionBook && (
        <ModalPortal>
          <div
            className="fixed inset-0 z-[9999] grid place-items-center bg-slate-900/60 p-4"
            onClick={() => setDescriptionBook(null)}
          >
            <div
              className="relative w-full max-w-lg max-h-[90svh] overflow-hidden rounded-2xl bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              {/* Close button */}
              <button
                type="button"
                className="absolute right-3 top-3 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200  cursor-pointer"
                onClick={() => setDescriptionBook(null)}
              >
                Close
              </button>

              <div className="flex gap-4 border-b border-slate-100 p-4">
                <div className="h-24 w-16 flex-shrink-0 overflow-hidden rounded-md bg-slate-100">
                  <img
                    src={coverUrl(descriptionBook.coverid)}
                    alt={`${descriptionBook.bookname ?? "Book"} cover`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center gap-1">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {descriptionBook.bookname || "Untitled"}
                  </h2>
                  {descriptionBook.author && (
                    <p className="text-sm text-slate-600">
                      {descriptionBook.author}
                    </p>
                  )}
                  {descriptionBook.genre && (
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      {descriptionBook.genre}
                    </p>
                  )}
                </div>
              </div>

              <div className="max-h-[48vh] overflow-y-auto px-4 py-3 text-sm text-slate-700">
                {descriptionBook.description
                  ? descriptionBook.description
                  : "No description available for this book."}
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-4 py-3">
                <a
                  href={amazonSearchUrl(
                    descriptionBook.bookname,
                    descriptionBook.author
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-amber-500 px-3 py-2 text-xs font-medium text-white shadow-sm hover:bg-amber-400"
                >
                  View on Amazon
                </a>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </>
  );
}
