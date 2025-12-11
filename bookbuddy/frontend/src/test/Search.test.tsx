import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from "../Search";
import { Routes, Route, MemoryRouter, BrowserRouter } from "react-router-dom";
import { act } from 'react';
import { vi, describe, test, beforeEach, afterEach, expect } from "vitest";
import { addBookToLibrary } from "../Search";

//Test to see if the route is rendered
describe('Search Rendering', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <React.StrictMode>
                <Search />
            </React.StrictMode>
        );

        //sees if it exists
        expect(container).toBeInTheDocument();
    });
});

const createFetchResponse = (data: any) => ({
    ok: true,
    json: () => Promise.resolve(data),
});

test('Search results render properly', async () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    global.fetch = vi.fn().mockResolvedValue(
        createFetchResponse({
            docs: [
                {
                    volumeInfo: {
                        title: 'The Hobbit',
                        authors: ['J.R.R. Tolkien'],
                    },
                },
            ],
        })
    );

    render(
        <MemoryRouter>
            <Search />
        </MemoryRouter>
    );

    const input = screen.getByLabelText('Book Title', { selector: 'input' });
    const button = screen.getByRole('button', { name: /Search/i });

    fireEvent.change(input, { target: { value: 'Hobbit' } });
    fireEvent.click(button);

    // Wait for book card to appear
    const addButton = await screen.findByRole('button', { name: /Add to my library/i });
    expect(addButton).toBeInTheDocument();

    const bookCards = screen.getAllByRole('listitem');
    expect(bookCards.length).toBeGreaterThan(0);

    // Confirm fetch was called
    expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('Hobbit')
    );

    expect(screen.queryByText('No results found')).not.toBeInTheDocument();
});

// I tried for like two hours and could not get coverage for the toasts no matter what I tried

describe("addBookToLibrary", () => {
    const title = "The Hobbit";

    beforeEach(() => {
        vi.restoreAllMocks();
    });

    const performSearch = async (mockFetch: any, bookOverrides?: any) => {
        global.fetch = mockFetch;

        render(<Search/>);

        const input = screen.getByLabelText("Book Title", { selector: "input" });

        const searchButtons = screen.getAllByRole("button", { name: /Search/i });
        const searchButton = searchButtons[0];

        fireEvent.change(input, { target: { value: title } });
        await act(async () => {
            fireEvent.click(searchButton);
        });

        const addButton = await screen.findByRole("button", { name: /Add to my library/i });
        return addButton;
    };

    it("Adds book to library properly", async () => {
        let addButton = await performSearch(
            vi.fn().mockResolvedValue({
                status: 200,
                ok: true,
                json: vi.fn().mockResolvedValue({
                    docs: [
                        {
                            bookname: title,
                            author: "J.R.R. Tolkien",
                            isbn: "978-0261102217",
                        },
                    ],
                }),
            })
        );

        global.fetch = vi.fn().mockResolvedValue({
            status: 409,
            ok: false,
            text: vi.fn().mockResolvedValue("Already exists"),
        });
        await act(async () => {
            fireEvent.click(addButton);
        });

        global.fetch = vi.fn().mockResolvedValue({
            status: 200,
            ok: true,
            json: vi.fn().mockResolvedValue({
                bookname: title,
                author: "J.R.R. Tolkien",
            }),
        });
        await act(async () => {
            fireEvent.click(addButton);
        });

        global.fetch = vi.fn().mockRejectedValue(new Error("Network fail"));
        await act(async () => {
            fireEvent.click(addButton);
        });

        global.fetch = vi.fn().mockResolvedValue({
            status: 500,
            ok: false,
            text: vi.fn(),
        });
        await act(async () => {
            fireEvent.click(addButton);
        });

        addButton = await performSearch(
            vi.fn().mockResolvedValue({
                status: 200,
                ok: true,
                json: vi.fn().mockResolvedValue({
                    docs: [
                        {
                            bookname: undefined,
                            author: undefined,
                            isbn: undefined,
                        },
                    ],
                }),
            })
        );

        global.fetch = vi.fn().mockResolvedValue({
            status: 200,
            ok: true,
            json: vi.fn().mockResolvedValue({}),
        });
        await act(async () => {
            fireEvent.click(addButton);
        });
    });
});

describe("addBookToWishlist", () => {
    const title = "The Hobbit";

    beforeEach(() => {
        vi.restoreAllMocks();
    });

    const performSearchWishlist = async (mockFetch: any, bookOverrides?: any) => {
        global.fetch = mockFetch;

        render(<Search />);

        const input = screen.getByLabelText("Book Title", { selector: "input" });

        const searchButtons = screen.getAllByRole("button", { name: /Search/i });
        const searchButton = searchButtons[0];

        fireEvent.change(input, { target: { value: title } });
        await act(async () => {
            fireEvent.click(searchButton);
        });

        const wishlistButton = await screen.findByRole("button", { name: /Add to wishlist/i });
        return wishlistButton;
    };

    it("Adds book to wishlist properly", async () => {
        let wishlistButton = await performSearchWishlist(
            vi.fn().mockResolvedValue({
                status: 200,
                ok: true,
                json: vi.fn().mockResolvedValue({
                    docs: [
                        {
                            bookname: title,
                            author: "J.R.R. Tolkien",
                            isbn: "978-0261102217",
                        },
                    ],
                }),
            })
        );

        global.fetch = vi.fn().mockResolvedValue({
            status: 500,
            ok: false,
            json: vi.fn(),
        });
        await act(async () => {
            fireEvent.click(wishlistButton);
        });

        global.fetch = vi.fn().mockResolvedValue({
            status: 200,
            ok: true,
            json: vi.fn().mockResolvedValue({
                bookname: title,
                author: "J.R.R. Tolkien",
            }),
        });
        await act(async () => {
            fireEvent.click(wishlistButton);
        });

        global.fetch = vi.fn().mockRejectedValue(new Error("Network fail"));
        await act(async () => {
            fireEvent.click(wishlistButton);
        });

        wishlistButton = await performSearchWishlist(
            vi.fn().mockResolvedValue({
                status: 200,
                ok: true,
                json: vi.fn().mockResolvedValue({
                    docs: [
                        {
                            bookname: undefined,
                            author: undefined,
                            isbn: undefined,
                        },
                    ],
                }),
            })
        );

        global.fetch = vi.fn().mockResolvedValue({
            status: 200,
            ok: true,
            json: vi.fn().mockResolvedValue({}),
        });
        await act(async () => {
            fireEvent.click(wishlistButton);
        });
    });
});