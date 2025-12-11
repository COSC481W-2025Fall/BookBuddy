import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Profile from "../Profile";
import {getMyLibrary, getCurrentUser} from "../api";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom/vitest';

// Mock API functions
vi.mock("../api", () => ({
    getCurrentUser: vi.fn(),
    getMyLibrary: vi.fn(),
}));

// Mock react-router navigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (orig) => {
    const actual = await orig();
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

function renderWithRouter(ui: React.ReactNode) {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe("Profile Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });it("shows loading text initially", () => {
        renderWithRouter(<Profile />);
        expect(screen.getByText("Loading profile...")).toBeInTheDocument();
    });

    it("loads and displays user profile info", async () => {
        (getCurrentUser as vi.Mock).mockResolvedValue({
            name: "Gandalf",
            aiLimit: 7,
        });

        (getMyLibrary as vi.Mock).mockResolvedValue([
            { id: 1, title: "The Hobbit", pagecount: 200 },
            { id: 2, title: "A Game of Thrones", pagecount: 200 },
        ]);

        renderWithRouter(<Profile />);

        await screen.findByText("Books in Library:", { exact: false });

        expect(screen.getByText("Books in Library:", { exact: false })).toBeInTheDocument()
        expect(screen.getByText("Total Pages:", { exact: false })).toBeInTheDocument()
        expect(screen.getByText("AI Uses Remaining:", { exact: false })).toBeInTheDocument()
    });

    it("navigates to login upon API failure", async () => {
        (getCurrentUser as vi.Mock).mockRejectedValue(new Error("Auth error"));

        renderWithRouter(<Profile />);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/login");
        });
    });

    it("navigates to /library when button is clicked", async () => {
        (getCurrentUser as vi.Mock).mockResolvedValue({
            name: "Gandalf",
            aiLimit: 7,
        });

        (getMyLibrary as vi.Mock).mockResolvedValue([]);

        renderWithRouter(<Profile />);

        await waitFor(() =>
            expect(screen.getByText("Hello, Gandalf!")).toBeInTheDocument()
        );

        const btn = screen.getByRole("button", { name: "Go to My Library" });
        fireEvent.click(btn);

        expect(mockNavigate).toHaveBeenCalledWith("/library");
    });
});
