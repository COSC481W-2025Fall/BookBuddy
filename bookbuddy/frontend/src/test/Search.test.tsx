import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from "../Search";
import { Routes, Route, MemoryRouter, BrowserRouter } from "react-router-dom";
import { act } from 'react';

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

    const input = screen.getByLabelText('Please enter a book you would like to search', { selector: 'input' });
    const button = screen.getByRole('button', { name: /Search/i });

    fireEvent.change(input, { target: { value: 'Hobbit' } });
    fireEvent.click(button);

    // Wait for book card to appear
    const addButton = await screen.findByRole('button', { name: /ADD BOOK TO MY LIBRARY/i });
    expect(addButton).toBeInTheDocument();

    const bookCards = screen.getAllByRole('listitem');
    expect(bookCards.length).toBeGreaterThan(0);

    // Confirm fetch was called
    expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('Hobbit')
    );

    expect(screen.queryByText('No results found')).not.toBeInTheDocument();
});