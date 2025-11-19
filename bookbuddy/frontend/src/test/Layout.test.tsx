import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Routes, Route, MemoryRouter, BrowserRouter } from "react-router-dom";
import { act } from 'react';

import Layout from "../components/Layout"

//Test to see if the layout is rendered
describe('Layout Rendering', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        );
        //sees if it exists
        expect(container).toBeInTheDocument();
    });
});