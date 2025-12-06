import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
