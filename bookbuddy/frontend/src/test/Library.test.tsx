import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Library from "../Library";
import { getMyLibrary, removeFromLibrary } from "../api";
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

    expect(screen.getByText("Add your Goodreads™ Library!")).toBeInTheDocument();
  });

  it('navigates to login if AUTH error occurs', async () => {
    (api.getMyLibrary as any).mockRejectedValue(new Error('AUTH'));

    render(<MemoryRouter><Library /></MemoryRouter>);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });
});

describe('Library Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    render(
        <MemoryRouter>
          <Library />
        </MemoryRouter>
    );
    expect(screen.getByText('Loading your books…')).toBeInTheDocument();
  });

  it('shows error state for non-AUTH errors', async () => {
    (getMyLibrary as any).mockRejectedValue({ message: "Something failed" });

    render(
        <MemoryRouter>
          <Library />
        </MemoryRouter>
    );

    expect(await screen.findByText("Something failed")).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('shows empty state when library has 0 books', async () => {
    (getMyLibrary as any).mockResolvedValue([]);

    render(
        <MemoryRouter>
          <Library />
        </MemoryRouter>
    );

    expect(await screen.findByText("You haven't added any books yet.")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search for books/i })).toBeInTheDocument();
  });

  it('renders loaded books', async () => {
    const books = [
      {
        bookname: "The Hobbit"
      },
    ];
    (getMyLibrary as any).mockResolvedValue(books);

    render(
        <MemoryRouter>
          <Library />
        </MemoryRouter>
    );

    expect(await screen.findByText("The Hobbit")).toBeInTheDocument();
  });

  it("opens description when clicking Description button", async () => {
    const books = [
      {
        bookname: "The Hobbit",
        author: "J.R.R. Tolkien",
      },
    ];
    (getMyLibrary as any).mockResolvedValue(books);

    render(
        <MemoryRouter>
          <Library/>
        </MemoryRouter>
    );

    const descBtn = await screen.findByRole("button", { name: /description/i });
    fireEvent.click(descBtn);

    const desc = await screen.findByRole("dialog");
    expect(desc).toBeInTheDocument();

    const withinDesc = within(desc);
    expect(withinDesc.getByText("The Hobbit")).toBeInTheDocument();
  });

  it('changes sort key when selecting from dropdown', async () => {
    const books = [
      {
        bookname: "The Hobbit",
        author: "J.R.R. Tolkien"
      },
    ];
    (getMyLibrary as any).mockResolvedValue(books);

    render(
        <MemoryRouter>
          <Library />
        </MemoryRouter>
    );

    const sortSelect = await screen.findByLabelText(/Sort by/i);

    fireEvent.change(sortSelect, { target: { value: "name" } });
    expect(sortSelect).toHaveValue("name");

    fireEvent.change(sortSelect, { target: { value: "author" } });
    expect(sortSelect).toHaveValue("author");
  });

  it('toggles sort direction when clicking A→Z / Z→A button', async () => {
    (getMyLibrary as any).mockResolvedValue([]);

    render(
        <MemoryRouter>
          <Library />
        </MemoryRouter>
    );

    const btn = await screen.findByRole("button", { name: "A→Z" });

    fireEvent.click(btn);
    expect(btn).toHaveTextContent("Z→A");

    fireEvent.click(btn);
    expect(btn).toHaveTextContent("A→Z");
  });
});