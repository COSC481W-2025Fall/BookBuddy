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
      setStatus('⚠️ Please enter a book title to search.');
      setBookResults([]);
      return;
    }

    setStatus('🔎 Searching…');

    try {
      const searchRes = await fetch(
        `${BASE}/googlebooks/search/${encodeURIComponent(title.trim())}`,
      );

      if (!searchRes.ok) {
        throw new Error(`Search failed: ${searchRes.status}`);
      }

      const data = await searchRes.json();

      if (!data.docs || data.docs.length === 0) {
        setStatus('📭 No results found. Try a different title?');
        setBookResults([]);
        return;
      }

      setBookResults(data.docs);
      setStatus(`📚 Found ${data.docs.length} book${data.docs.length === 1 ? '' : 's'}.`);
    } catch (err: any) {
      console.error('Error searching books', err);
      setStatus('❌ Something went wrong while searching. Please try again.');
      setBookResults([]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Search panel – no more `card` class here */}
      <div className="w-full space-y-6 p-6 shadow-md rounded-xl border border-gray-200 bg-white min-h-[220px]">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Find your next <span className="underline decoration-pink-300 underline-offset-4">book</span>
          </h1>
          <p className="text-base text-gray-600">
            Search any title and explore available book details.
          </p>
        </div>

        <form
          role="form"
          onSubmit={doAddBook}
          className="space-y-4"
        >
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

        {status && (
          <div className="text-sm font-medium bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-800">
            {status}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mt-10 border-t pt-8">
        <Book_display result={bookResults} />
      </div>
    </div>
  );
}
