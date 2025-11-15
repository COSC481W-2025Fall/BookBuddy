export async function searchBookViaTitle(title: string, BASE: string): Promise<BookDto | null> {
       const res = await fetch(`${BASE}/googlebooks/search/${encodeURIComponent(title)}`);
       if (!res.ok) throw new Error(`Search failed: ${res.status}`);

       const data = await res.json();

       return (data.docs?.[0] as BookDto) ?? null; //returns the first book
   }