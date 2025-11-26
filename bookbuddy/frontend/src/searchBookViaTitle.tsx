import type { BookDto } from "./types/BookDto";

/**
 * Searches for a book by title and returns the **first result**
 * Always returns BookDto OR null (never undefined)
 */
export async function searchBookViaTitle(
  title: string,
  BASE: string
): Promise<BookDto | null> {
  try {
    const res = await fetch(
      `${BASE}/googlebooks/search/${encodeURIComponent(title)}`
    );

    // If request fails → return null instead of undefined
    if (!res.ok) return null;

    const data = await res.json();

    // Guarantee output type: BookDto | null
    return (data?.docs?.[0] as BookDto) ?? null;
  } catch (err) {
    console.error("searchBookViaTitle error:", err);
    return null;
  }
}
