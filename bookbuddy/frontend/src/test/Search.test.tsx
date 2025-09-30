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
/*
//test to see if the search works properly
test('search is returned correctly', () => {
    afterEach(() => {
      vi.clearAllMocks()
    });

    //renders the page
    render(<MemoryRouter><Search /></MemoryRouter>);

    var form = screen.getByRole('form');

    //input for the title to be searched
    const titleInput = screen.getByLabelText("Please enter a book you would like to search");

    act(() => {
        //inputs the title, and presses the search button
        fireEvent.change(titleInput, { target: { value: 'Hobbit' } });
        fireEvent.click(screen.getByRole("button", { name: /Search/i }));

        return screen.findByText(/J.R.R. Tolkien/i).then((message) => {
            expect(message).toBeInTheDocument();
            expect(search.Search.toHaveBeenCalled());
        });
    });


});
*/