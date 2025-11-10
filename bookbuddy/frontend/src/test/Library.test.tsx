import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Library from "../Library";
import { MemoryRouter } from "react-router-dom";

// Mock navigate from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock API
import * as api from '../api';
vi.mock('../api');

describe('Library Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders loading state', () => {
    render(<MemoryRouter><Library /></MemoryRouter>);
    expect(screen.getByText('Loading your books…')).toBeInTheDocument();
  });

  it('renders empty library state', async () => {
    (api.getMyLibrary as any).mockResolvedValue([]);
    render(<MemoryRouter><Library /></MemoryRouter>);

    await waitFor(() => screen.getByText("You haven't added any books yet."));
    expect(screen.getByText("You haven't added any books yet.")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search for books/i })).toBeInTheDocument();
  });

  //Test for seeing if the books are rendered from the API
  it('renders books from API', async () => {
    const books = [
      { bookname: 'Book A', author: 'Author A', isbn: '111', coverid: 'abc', genre: 'Fiction' },
      { bookname: 'Book B', author: 'Author B', isbn: '222', coverid: 'def', genre: 'Non-Fiction' },
    ];
    (api.getMyLibrary as any).mockResolvedValue(books);

    render(<MemoryRouter><Library /></MemoryRouter>);

    await waitFor(() => screen.getByText('Book A'));
    expect(screen.getByText('Book A')).toBeInTheDocument();
    expect(screen.getByText('Book B')).toBeInTheDocument();
    expect(screen.getByText('Author A')).toBeInTheDocument();
    expect(screen.getByText('Author B')).toBeInTheDocument();
  });

  it('handles API error and shows generic error message', async () => {
    (api.getMyLibrary as any).mockRejectedValue(new Error('Oops!'));

    render(<MemoryRouter><Library /></MemoryRouter>);

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Oops!');
    fireEvent.click(screen.getByRole('button', { name: /Go to Search/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/search');
  });

  it('navigates to login if AUTH error occurs', async () => {
    (api.getMyLibrary as any).mockRejectedValue(new Error('AUTH'));

    render(<MemoryRouter><Library /></MemoryRouter>);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  //Test for the new sorting in the library
  it('sorts books when sort key or direction changes', async () => {
    const books = [
      { bookname: 'C', author: 'Author C' },
      { bookname: 'A', author: 'Author A' },
      { bookname: 'B', author: 'Author B' },
    ];
    (api.getMyLibrary as any).mockResolvedValue(books);

    render(<MemoryRouter><Library /></MemoryRouter>);
    await waitFor(() => screen.getByText('C'));

    // Change sort key to author
    fireEvent.change(screen.getByLabelText(/Sort by/i), { target: { value: 'author' } });

    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Author A');
    expect(items[1]).toHaveTextContent('Author B');
    expect(items[2]).toHaveTextContent('Author C');

    // Toggle sort direction
    fireEvent.click(screen.getByRole('button', { name: /Toggle sort direction/i }));
    const reversedItems = screen.getAllByRole('listitem');
    expect(reversedItems[0]).toHaveTextContent('Author C');
    expect(reversedItems[1]).toHaveTextContent('Author B');
    expect(reversedItems[2]).toHaveTextContent('Author A');
  });
});
