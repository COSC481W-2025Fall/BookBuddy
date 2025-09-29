import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Library from "../Library";
import { Routes, Route, MemoryRouter, BrowserRouter } from "react-router-dom";
import { act } from 'react';
import { Routes, Route, MemoryRouter } from "react-router-dom";

//Test to see if the route is rendered
describe('Library Rendering', () => {
    it('renders without crashing', () => {
         const { container } = render(<MemoryRouter><Library /></MemoryRouter>);

        //sees if it exists
        expect(container).toBeInTheDocument();
        expect(screen.getAllByText('My Library'));
        expect(screen.getAllByText('Loading your books…'));
    });
});

describe('Has no books on screen', () => {
    it("shows empty state after books load with 0 items", async () => {
        render(<MemoryRouter><Library books={[]} /></MemoryRouter>);
        const loaded = await screen.findByText("Go to Search")

        expect(loaded).toBeInTheDocument();

        // Should show search button
        const searchButton = screen.getByRole("button", { name: /Go to Search/i });
        expect(searchButton).toBeInTheDocument();
    });
});