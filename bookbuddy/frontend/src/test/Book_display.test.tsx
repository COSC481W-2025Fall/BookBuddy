import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Book_display from '../Book_display';
import type { BookDto } from '../types/BookDto';

//Tests made with help from ChatGPT

// Mock fetch globally
global.fetch = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
});

describe('Book_display component', () => {
  //Test for when there are no results
  it('renders empty state when no results', () => {
    render(<Book_display result={[]} />);
    expect(screen.getByText(/No results to display/i)).toBeInTheDocument();
  });

  //Test for seeing if the books are displayed
  it('renders book results correctly', () => {
    const books: BookDto[] = [
      { bookname: "Book 1", author: "Author 1", genre: "Fiction", isbn: "111" },
      { bookname: "Book 2", author: "Author 2", genre: "Non-Fiction", isbn: "222" },
    ];

    render(<Book_display result={books} />);

    books.forEach(book => {
      expect(screen.getByText(book.bookname!)).toBeInTheDocument();
      expect(screen.getByText(book.author!)).toBeInTheDocument();
      expect(screen.getByText(book.genre!)).toBeInTheDocument();
      expect(screen.getByText(book.isbn!)).toBeInTheDocument();
    });

    expect(screen.getAllByRole('button', { name: /add book/i }).length).toBe(2);
    expect(screen.getAllByRole('button', { name: /add to wishlist/i }).length).toBe(2);
  });

  //Test to see if you can add a book to a library
  it('adds a book to library successfully', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ bookname: "testBook", author: "testAuthor" }),
    });

    render(<Book_display result={[{ bookname: "testBook", author: "testAuthor", genre: "Fiction", isbn: "111" }]} />);

    const addButton = screen.getByRole('button', { name: /add book/i });
    fireEvent.click(addButton);

    expect(fetch).toHaveBeenCalledWith(
      "/books/add",
      expect.objectContaining({ method: "POST" })
    );

    expect(await screen.findByText(/Book added! testBook by testAuthor/i)).toBeInTheDocument();
  });

  //Test to see what happens if the same book is added twice
  it('handles library add conflict', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 409,
      text: async () => "Book already exists",
    });

    render(<Book_display result={[{ bookname: "Book X", author: "Author X", genre: "Fiction", isbn: "999" }]} />);

    const button = screen.getByRole('button', { name: /add book/i });
    fireEvent.click(button);

    expect(await screen.findByText(/Book already exists/i)).toBeInTheDocument();
  });

  //Test to see if a book is added to the wishlist correctly
  it('adds a book to wishlist successfully', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ bookname: "wishBook", author: "wishAuthor" }),
    });

    render(<Book_display result={[{ bookname: "wishBook", author: "wishAuthor", genre: "Fiction", isbn: "555" }]} />);

    const wishlistButton = screen.getByRole('button', { name: /add to wishlist/i });
    fireEvent.click(wishlistButton);

    expect(fetch).toHaveBeenCalledWith(
      "/wishbooks/add",
      expect.objectContaining({ method: "POST" })
    );

    expect(await screen.findByText(/Added to wishlist: wishBook by wishAuthor/i)).toBeInTheDocument();
  });

  //Test to see if a book is not added to the wishlist correctly
  it('handles wishlist add failure', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => "Server error",
    });

    render(<Book_display result={[{ bookname: "failBook", author: "failAuthor", genre: "Fiction", isbn: "777" }]} />);

    const button = screen.getByRole('button', { name: /add to wishlist/i });
    fireEvent.click(button);

    expect(await screen.findByText(/Add to wishlist failed: 500/i)).toBeInTheDocument();
  });

  //Test to see if the fallback image is being used
  it('uses fallback image if coverid is missing', () => {
    render(<Book_display result={[{ bookname: "NoCover", author: "Author NC", genre: "Fiction", isbn: "123" }]} />);
    const img = screen.getByAltText(/NoCover/i) as HTMLImageElement;
    expect(img.src).toContain('The_Hobbit_trilogy_dvd_cover.jpg');
    //expect(img.src).toContain('noCoverFound.png');
  });
});
