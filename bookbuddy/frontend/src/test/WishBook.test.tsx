import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import WishWishBook from "../WishBook";
import { getMyWishBook } from "../api";
import { Routes, Route, MemoryRouter, BrowserRouter } from "react-router-dom";
import { act } from 'react';
import { Routes, Route, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import WishlistButton from "../Add_Result_to_Wishlist";

//Test to see if the route is rendered
describe('WishBook Library Rendering', () => {
    it('renders without crashing', () => {
         const { container } = render(<MemoryRouter><WishWishBook /></MemoryRouter>);

        //sees if it exists
        expect(container).toBeInTheDocument();
        expect(screen.getAllByText('Loading your wishlist…'));
    });
});

// describe('Has no books on screen', () => {
//     it("shows empty state after books load with 0 items", async () => {
//         render(<MemoryRouter><WishWishBook books={[]} /></MemoryRouter>);
//         const loaded = await screen.findByText("Go to Search")
//
//         expect(loaded).toBeInTheDocument();
//
//         // Should show search button
//         const searchButton = screen.getByRole("button", { name: /Go to Search/i });
//         expect(searchButton).toBeInTheDocument();
//     });
// });

vi.mock("../api", () => ({
    getMyWishBook: vi.fn(),
}));

vi.mock("react-router-dom", async (importOriginal) => {
    const actual = await importOriginal<typeof import("react-router-dom")>();
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

const mockBooks = [
    {
        bookname: "The Hobbit",
        author: "J.R.R. Tolkien",
    },
];

describe("Wishbook Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders error state", async () => {
        (getMyWishBook as Mock).mockRejectedValue(new Error("Something failed"));

        render(
            <MemoryRouter>
                <WishWishBook/>
            </MemoryRouter>
        );

        expect(
            await screen.findByText(/something failed/i)
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: /go to search/i })
        ).toBeInTheDocument();
    });

    it("shows empty state after books load with 0 items", async () => {
        (getMyWishBook as Mock).mockResolvedValue([]);

        render(
            <MemoryRouter>
                <WishWishBook/>
            </MemoryRouter>
        );

        expect(
            await screen.findByText(/you haven't added any books/i)
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: /search for books/i })
        ).toBeInTheDocument();
    });

    it("renders book cards when wishlist has items", async () => {
        (getMyWishBook as Mock).mockResolvedValue(mockBooks);

        render(
            <MemoryRouter>
                <WishWishBook/>
            </MemoryRouter>
        );

        expect(await screen.findByText(/The Hobbit/i)).toBeInTheDocument();
        expect(screen.getByText(/J.R.R. Tolkien/i)).toBeInTheDocument();
    });

    it("opens description when clicking description button", async () => {
        (getMyWishBook as Mock).mockResolvedValue(mockBooks);

        render(
            <MemoryRouter>
                <WishWishBook/>
            </MemoryRouter>
        );

        const descriptionBtn = await screen.findByRole("button", { name: /description/i });
        fireEvent.click(descriptionBtn);

        const desc = await screen.findByRole("dialog");

        expect(
            within(desc).getByText(/The Hobbit/i)
        ).toBeInTheDocument();
    });
});