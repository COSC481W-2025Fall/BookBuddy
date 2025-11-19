import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from '../App';

//Test to see if the route is rendered
describe('App Rendering', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
        //sees if it exists
        expect(container).toBeInTheDocument();
    });
});
