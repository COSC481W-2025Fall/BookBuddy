import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import CSVReader from "../addBooksViaCSV";
import { searchBookViaTitle } from "../searchBookViaTitle";
import { addCSVBooks } from "../addCSVBooks";

vi.mock("../searchBookViaTitle");
vi.mock("../addCSVBooks");

function mockCSV(text: string) {
    const f = new File(["placeholder"], "test.csv", { type: "text/csv" });
    (f as any)._mockText = text;
    return f;
}

describe("CSVReader Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        class MockFileReader {
            onload = null;
            readAsText(file) {
                this.onload?.({ target: { result: file._mockText } });
            }
        }
        global.FileReader = MockFileReader;

        delete window.location;
        Object.defineProperty(window, "location", {
            value: {
                ...window.location,
                reload: vi.fn(),
            },
            writable: true,
            configurable: true,
        });

        vi.stubGlobal("setTimeout", (fn) => {
            fn();
            return 0;
        });
    });

    it("renders the CSV component", () => {
        render(
            <MemoryRouter>
                <CSVReader />
            </MemoryRouter>
        );

        expect(
            screen.getByText("Add your Goodreads™ Library!")
        ).toBeInTheDocument();
    });

    it("parses uploaded CSV and triggers search + add calls", async () => {
        (searchBookViaTitle as vi.Mock).mockResolvedValue({
            bookname: "The Hobbit",
        });

        (addCSVBooks as vi.Mock).mockResolvedValue({
            ok: true,
            message: "Added",
        });

        render(
            <MemoryRouter>
                <CSVReader />
            </MemoryRouter>
        );

        const input = screen.getByLabelText("No File Chosen!");
        const csv = mockCSV(`title\na test title`);

        await act(async () => {
            fireEvent.change(input, { target: { files: [csv] } });
        });

        expect(searchBookViaTitle).toHaveBeenCalledWith("a test title", "");
        expect(addCSVBooks).toHaveBeenCalled();
    });

    it("displays loading screen when processing", async () => {
        (searchBookViaTitle as vi.Mock).mockResolvedValue({
            bookname: "My Book",
        });

        (addCSVBooks as vi.Mock).mockResolvedValue({ ok: true });

        render(
            <MemoryRouter>
                <CSVReader />
            </MemoryRouter>
        );

        const input = screen.getByLabelText("No File Chosen!");
        const csv = mockCSV(`title\nBook 1`);

        await act(async () => {
            fireEvent.change(input, { target: { files: [csv] } });
        });
    });
});
