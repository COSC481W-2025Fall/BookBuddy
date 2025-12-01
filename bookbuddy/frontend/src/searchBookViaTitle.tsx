import type { BookDto } from "./types/BookDto";
export async function searchBookViaTitle(title: string, BASE: string): Promise<BookDto | null> {
    const res = await fetch(`${BASE}/googlebooks/search/${encodeURIComponent(title)}`);
    if (!res.ok) return;

    const data = await res.json();

    return (data.docs?.[0] as BookDto) ?? null; //returns the first book
}