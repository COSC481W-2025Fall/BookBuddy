import { render, screen, fireEvent, act } from "@testing-library/react";
import CSVReader from "../addBooksViaCSV";
import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { searchBookViaTitle } from "../searchBookViaTitle";
import { addCSVBooks } from "../addCSVBooks";


describe('CSV Adder', () => {
    it('should show the CSV comp', () => {
        render(<MemoryRouter><CSVReader /></MemoryRouter>);
        expect(screen.getAllByText('Add your Goodreads™ Library!'));
    });
})