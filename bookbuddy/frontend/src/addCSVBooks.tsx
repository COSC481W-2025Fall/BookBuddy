import type { BookDto } from "./types/BookDto";

export async function addCSVBooks(selected_book: BookDto, BASE: string) {
    const newBook: BookDto = {
        bookname: selected_book.bookname ?? "Unknown",
        author: selected_book.author ?? "Unknown",
        isbn: selected_book.isbn ?? "Unknown",
        genre: selected_book.genre ?? "Unknown",
        coverid: selected_book.coverid ?? "Unknown",
        publication: selected_book.publication ?? "Unknown",
        pagecount: selected_book.pagecount ?? 0,
        description: selected_book.description ?? "No description available",
    };

    try {
        const res = await fetch(`${BASE}/books/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBook),
        });

        if (res.status === 409) {
            const msg = await res.text();
            return { ok: false, status: 409, message: "Already exists in your library!" };
        }

        if (!res.ok) {
            return { ok: false, status: res.status, message: "Failed to add book!" };
        }

        return { ok: true };

    } catch (err: any) {
        return { ok: false, message: err.message ?? "Network error!" };
    }
}
