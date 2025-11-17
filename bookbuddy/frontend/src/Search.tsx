import React, { useState } from 'react';
import type { BookDto } from './types/BookDto';
import Book_display from './Book_display';

const BASE = ''; // keep empty, proxy or relative path handles backend

export default function Search() {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<string>('');
  const [bookResults, setBookResults] = useState<BookDto[]>([]);

  const doAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setStatus('Please enter a book title to search.');
      setBookResults([]);
      return;
    }

    setStatus('Searching…');

    try {
      const searchRes = await fetch(
        `${BASE}/googlebooks/search/${encodeURIComponent(title.trim())}`,
      );

      if (!searchRes.ok) {
        throw new Error(`Search failed: ${searchRes.status}`);
      }

      const data = await searchRes.json();

      if (!data.docs || data.docs.length === 0) {
        setStatus('No results found. Try a different title?');
        setBookResults([]);
        return;
      }

      // updates the React hook and stores search results within hook to send it to Book_display.tsx
      setBookResults(data.docs);
      setStatus(`Found ${data.docs.length} book${data.docs.length === 1 ? '' : 's'}.`);
    } catch (err: any) {
      console.error('Error searching books', err);
      setStatus('Something went wrong while searching. Please try again.');
      setBookResults([]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="card space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Find your book
          </h1>
          <p className="text-sm text-gray-600">
            Enter a title and find the book your are looking for.
          </p>
        </div>

        <form
          role="form"
          onSubmit={doAddBook}
          className="space-y-3 sm:space-y-0 sm:flex sm:items-end sm:gap-3"
        >
          <div className="flex-1">
            <input
              id="book-title"
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The Hobbit"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full sm:w-auto mt-1 sm:mt-0 bg-[#E2B4BD] hover:bg-[#DDA7B2]"
          >
            Search
          </button>
        </form>

        {status && (
          <p className="text-sm text-gray-700">
            {status}
          </p>
        )}
      </div>

      <div className="mt-8">
        {/* This sends the book results as a prop to another file */}
        <Book_display result={bookResults} />
      </div>
    </div>
  );
}
