import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Routes, Route, MemoryRouter, BrowserRouter } from "react-router-dom";
import { act } from 'react';
import Sidebar from "../components/Sidebar";

//Test to see if the sidebar is rendering when it should
//Created with a little ChatGPT help
describe('Sidebar', () => {
    it('renders without crashing', () => {
         render(<MemoryRouter><Sidebar /></MemoryRouter>);

         // The nav should exist but not have the 'open' class initially
         const nav = screen.getByRole("navigation", { name: /main navigation/i });
         expect(nav).not.toHaveClass("open");
    });

    it("should appear when the toggle button is clicked", () => {
        render(
          <MemoryRouter>
            <Sidebar />
          </MemoryRouter>
        );

        const button = screen.getByRole("button", { name: /toggle navigation/i });
        const nav = screen.getByRole("navigation", { name: /main navigation/i });

        // Initially hidden
        expect(nav).not.toHaveClass("open");

        // Click to open
        fireEvent.click(button);
        expect(nav).toHaveClass("open");

        // Click again to close
        fireEvent.click(button);
        expect(nav).not.toHaveClass("open");
    });

    it("should close when a link is clicked", () => {
        render(
          <MemoryRouter>
            <Sidebar />
          </MemoryRouter>
        );

        const button = screen.getByRole("button", { name: /toggle navigation/i });
        fireEvent.click(button); // open it first

        const nav = screen.getByRole("navigation", { name: /main navigation/i });
        const link = screen.getByRole("menuitem", { name: /search/i });

        expect(nav).toHaveClass("open");
        fireEvent.click(link);
        expect(nav).not.toHaveClass("open");
    });
});


