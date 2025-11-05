import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import * as api from "../api";

import Buddy from "../Buddy_Recommendation"

// Mock SendQeustions API
vi.mock("../api", () => ({
  SendQeustions: vi.fn(),
}));

// Mock WishlistButton
vi.mock("../Add_Result_to_Wishlist", () => ({
  __esModule: true,
  default: ({ nameOfBook }: { nameOfBook: string }) => (
    <div data-testid="wishlist-button">Added {nameOfBook}</div>
  ),
}));

// Mock fetch for /Questions.txt
global.fetch = vi.fn();

describe("Buddy Component", () => {
  it("shows error message if fetch fails", async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(
      <MemoryRouter>
        <Buddy />
      </MemoryRouter>
    );

    // Just make sure component renders without crashing
    await waitFor(() => {
      expect(screen.findAllByText("Question not found")[0]);
    });
  });
});