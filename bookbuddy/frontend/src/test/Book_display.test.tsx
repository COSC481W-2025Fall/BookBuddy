import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Routes, Route, MemoryRouter, BrowserRouter } from "react-router-dom";
import { act } from 'react';
import { Routes, Route, MemoryRouter } from "react-router-dom";
import type { BookDto } from '../types/BookDto'
import Book_display from '../Book_display'

//mock fetch
global.fetch = vi.fn();

it("adds book when button is clicked", async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ bookname: "testBook", author: "testAuthor" }),
      });

      render(<Book_display result={[{ bookname: "testBook", author: "testAuthor", genre: "testGenre", isbn: "111111111" }]} />);

      const button = screen.getByRole("button", { name: /add book/i });
      fireEvent.click(button);

      expect(fetch).toHaveBeenCalledWith(
        "/books/add",
        expect.objectContaining({ method: "POST" })
      );

      // Wait until status message appears
      expect(
        await screen.findByText(/Book added! testBook by testAuthor/i)
      ).toBeInTheDocument();
});

