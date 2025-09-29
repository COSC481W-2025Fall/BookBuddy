import type { AccountDto } from './types/AccountDto'
import type { BookDto } from './types/BookDto'
import type { LoginDto } from './types/LoginDto'

// proxy means we call relative paths, Vite forwards to 8080
const BASE = ''

export async function ping(): Promise<string> {
    const res = await fetch(`${BASE}/Account/ping`)
    if (!res.ok) throw new Error(`Ping failed: ${res.status}`)
    return res.text()
}

export async function addAccount(body: AccountDto): Promise<AccountDto> {


    const res = await fetch(`${BASE}/Account/addAccount`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
    if (!res.ok) {
        //const details = await res.text().catch(() => '') // Changed by Ryan R. I have no clue why this line is breaking stuff
        const details = "I have no idea"
        throw new Error(`Add failed: ${res.status}${details ? ' - ' + details : ''}`)
    }
    return res.json()
}

// LOGIN
export async function login(body: { name: string; password: string }): Promise<boolean> {
    const res = await fetch(`${BASE}/login/attemptLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include", // so session cookies stick
    });

    if (!res.ok) return false;

    const txt = await res.text();
    return txt.trim() === "1"; // backend returns "1" on success
}


export async function getMyLibrary(): Promise<BookDto[]> {
    const res = await fetch(`/books/my-library`, { credentials: "include" });
    if (res.status === 401 || res.status === 403) throw new Error("AUTH");
    if (!res.ok) throw new Error(`Failed to load library: ${res.status}`);
    return res.json();

}

// this is where we are adding a book
export async function addBook(body: BookDto): Promise<BookDto> {
    const res = await fetch(`${BASE}/Book/addBook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`Book addition failed: ${res.status}`)
    return res.json()
}
export async function addLogin(body: LoginDto): Promise<boolean> {
    const res = await fetch(`${BASE}/login/attemptLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) return false;

    const txt = await res.text();
    return txt.trim() === "1";
}

