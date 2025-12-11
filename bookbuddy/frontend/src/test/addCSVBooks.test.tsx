import { describe, it, vi, beforeEach, expect } from "vitest";
import { addCSVBooks } from "../addCSVBooks"; // adjust path
import type { BookDto } from "../types/BookDto";

describe("addCSVBooks", () => {
    const BASE = "http://localhost";
    const testBook: BookDto = {
        bookname: "The Hobbit",
        author: "J. R. R. Tolkien"
    };

    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("returns ok:true on successful addition", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: vi.fn().mockResolvedValue({}),
        });

        const result = await addCSVBooks(testBook, BASE);
        expect(result).toEqual({ ok: true });
        expect(global.fetch).toHaveBeenCalledWith(`${BASE}/books/add`, expect.any(Object));
    });

    it("returns 409 if book already exists", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            status: 409,
            text: vi.fn().mockResolvedValue("Conflict"),
        });

        const result = await addCSVBooks(testBook, BASE);
        expect(result).toEqual({ ok: false, status: 409, message: "Already exists in your library!" });
    });

    it("returns failure for 500", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
            text: vi.fn(),
        });

        const result = await addCSVBooks(testBook, BASE);
        expect(result).toEqual({ ok: false, status: 500, message: "Failed to add book!" });
    });

    it("returns network error if fetch rejects", async () => {
        global.fetch = vi.fn().mockRejectedValue(new Error("Network down"));

        const result = await addCSVBooks(testBook, BASE);
        expect(result).toEqual({ ok: false, message: "Network down" });
    });

    it("uses default values if fields are missing", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: vi.fn().mockResolvedValue({}),
        });

        const result = await addCSVBooks({}, BASE);
        expect(result).toEqual({ ok: true });

        const body = JSON.parse((global.fetch as any).mock.calls[0][1].body);
        expect(body.bookname).toBe("Unknown");
        expect(body.author).toBe("Unknown");
        expect(body.description).toBe("No description available");
        expect(body.pagecount).toBe(0);
    });
});
