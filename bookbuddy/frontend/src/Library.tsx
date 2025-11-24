import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { BookDto } from "./types/BookDto";
import { getMyLibrary, removeFromLibrary } from "./api";
import "./components/Library.css";
import noCoverFound from "./logo/noCoverFound.png";
import tempAddBook from "./logo/tempAddBook.png";
import tempSearchBook from "./logo/tempSearchBook.png";
import CSVReader from "./addBooksViaCSV";

type SortKey = "name" | "author" | "genre";
type SortDir = "asc" | "desc";

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

export default function Library() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<BookDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const coverUrl = (coverid?: string) =>
    coverid
      ? `https://books.google.com/books/content?id=${coverid}&fife=w400-h600&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`
      : noCoverFound;

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

  const sortedBooks = useMemo(() => {
    return books
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
        const byName = compareStr(x.b.bookname, y.b.bookname, "asc");
        if (byName !== 0) return byName;
        const byAuthor = compareStr(x.b.author, y.b.author, "asc");
        if (byAuthor !== 0) return byAuthor;
        return x.i - y.i;
      })
      .map((entry) => entry.b);
  }, [books, sortKey, sortDir]);

  if (loading) {
    return (
      <div className="min-h-[60vh] bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-16">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            My Library
          </h1>
          <p className="mt-4 text-sm text-slate-500">Loading your books…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            My Library
          </h1>
          <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
          <button
            className="mt-6 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
            onClick={() => navigate("/search")}
          >
            Go to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              My Library
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Browse the books you've added to your collection.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Sort by
              </span>
              <select
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:ring-2 focus:ring-indigo-500"
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
              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:ring-2 focus:ring-indigo-500"
              onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
            >
              {sortDir === "asc" ? "A→Z" : "Z→A"}
            </button>
          </div>
        </div>

        {sortedBooks.length === 0 ? (
          <div className="mt-16 grid items-center gap-10 md:grid-cols-2">
            <div className="flex justify-center">
              <img
                src={tempSearchBook}
                alt="No books yet"
                className="max-w-xs w-full rounded-2xl shadow-sm"
              />
            </div>
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-8 text-center">
              <p className="text-sm text-slate-600">
                You haven&apos;t added any books yet.
              </p>
              <div className="mt-6 flex flex-col items-center gap-4">
                <button
                  className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
                  onClick={() => navigate("/search")}
                >
                  Search for books
                </button>

                <div className="w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-left">
                  <p className="text-sm font-medium text-slate-800 mb-2">
                    Or import from a CSV file
                  </p>
                  <CSVReader />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sortedBooks.map((b, i) => (
              <li
                key={(b.isbn ?? "no-isbn") + "-" + i}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg transition"
              >
                <div className="relative aspect-[2/3] bg-slate-100">
                  <img
                    src={coverUrl((b as any).coverid)}
                    alt={`${b.bookname ?? "Book"} cover`}
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

                  {(b.isbn || (b as any).genre) && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {b.isbn && (
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                          ISBN: {b.isbn}
                        </span>
                      )}
                      {(b as any).genre && (
                        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                          {(b as any).genre}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="mt-auto flex flex-col gap-2">
                    {(b as any).coverid && (
                      <a
                        href={`https://play.google.com/store/books/details?id=${encodeURIComponent(
                          (b as any).coverid
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500"
                      >
                        Description
                      </a>
                    )}

                    {b.isbn && (
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-100"
                        onClick={async () => {
                          try {
                            await removeFromLibrary(b.isbn!);
                            setBooks((prev) =>
                              prev.filter((book) => book.isbn !== b.isbn)
                            );
                          } catch (err: any) {
                            alert(err?.message ?? "Failed to remove book");
                          }
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}

            {/* Extra card for CSV import when you already have books */}
            <li className="flex flex-col overflow-hidden rounded-2xl border border-dashed border-slate-200 bg-white p-4 shadow-sm">
              <div className="relative aspect-[2/3] rounded-xl bg-slate-50 flex items-center justify-center mb-4">
                <img
                  src={tempAddBook}
                  alt="Add more books"
                  className="max-h-full max-w-full object-contain p-4"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <h2 className="text-base font-semibold text-slate-900">
                  Import more books
                </h2>
                <p className="text-sm text-slate-600">
                  Use a CSV file to quickly add multiple books to your library.
                </p>
                <div className="mt-auto">
                  <CSVReader />
                </div>
              </div>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
