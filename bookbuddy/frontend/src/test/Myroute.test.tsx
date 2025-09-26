import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Myroute from '../Myroute';

//Test to see if the route is rendered
describe('Myroute Rendering', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <BrowserRouter>
                <Myroute />
            </BrowserRouter>
        );
        //sees if it exists
        expect(container).toBeInTheDocument();
    });
});
