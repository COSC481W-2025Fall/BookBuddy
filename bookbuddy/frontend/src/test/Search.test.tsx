import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Search from "../Search";

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