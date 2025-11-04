import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WishlistButton from '../Add_Result_to_Wishlist';

//Tests made with help from ChatGPT

const fakeBook = {
    bookname: "TestBook",
    author: "TestAuthor",
    isbn: "TestIBSN",
    genre: "TestGenre",
    coverid: "TestCover",
    publication: "TestPublication",
    pagecount: 1,
    description: "TestDescription",
};

describe('WishlistButton', () => {
    let fetchMock: any;

    beforeEach(() => {
        fetchMock = vi.fn();
        // @ts-ignore
        global.fetch = fetchMock;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    //This test adds a fake book to the wishlist and sees if the output is correct
    // as well as the correct API calls
    it('adds a book to the wishlist successfully', async () => {
        // Mock search API
        fetchMock
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ docs: [fakeBook] }),
            })
            // Mock add API
            .mockResolvedValueOnce({
                ok: true,
                json: async () => fakeBook,
            });

        render(<WishlistButton nameOfBook="TestBook" />);

        const button = screen.getByRole('button', { name: /add to wishlist/i });
        fireEvent.click(button);

        // Check intermediate status
        expect(await screen.findByText(/searching for book details/i))

        // Wait for final status
        await waitFor(() =>
            expect(screen.getByText(/added to wishlist: TestBook by TestAuthor/i))
        );

        expect(fetchMock).toHaveBeenCalledTimes(2);
        expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/googlebooks/search/TestBook'));
        expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/wishbooks/add'), expect.any(Object));
    });

    //Test to see if the correct message appears when the wish list returns nothing
    it('shows "no matching results" if search returns empty', async () => {
        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ docs: [] }),
        });

        render(<WishlistButton nameOfBook="No Book" />);

        const button = screen.getByRole('button', { name: /add to wishlist/i });
        fireEvent.click(button);

        await waitFor(() =>
            expect(screen.getByText(/no matching results found/i))
        );

        expect(fetchMock).toHaveBeenCalledOnce();
    });

    //Test for the error message if adding a book fails
    it('shows error if adding book fails', async () => {
        fetchMock
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ docs: [fakeBook] }),
            })
            .mockResolvedValueOnce({
                ok: false,
                status: 500,
            });

        render(<WishlistButton nameOfBook="Fail Book" />);

        const button = screen.getByRole('button', { name: /add to wishlist/i });
        fireEvent.click(button);

        await waitFor(() =>
            expect(screen.getByText(/add to wishlist failed: 500/i))
        );
    });
});
