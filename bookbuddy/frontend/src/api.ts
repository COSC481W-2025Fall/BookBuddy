import type { AccountDto } from "./types/AccountDto";
import type { BookDto } from "./types/BookDto";
import type { LoginDto } from "./types/LoginDto";

// proxy means we call relative paths, Vite forwards to 8080
const BASE = "";

// Health check
export async function ping(): Promise<string> {
    const res = await fetch(`${BASE}/Account/ping`);
    if (!res.ok) throw new Error(`Ping failed: ${res.status}`);
    return res.text();
}

// Signup
export async function addAccount(body: AccountDto): Promise<AccountDto> {
    const res = await fetch(`${BASE}/Account/addAccount`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
    });
    if (!res.ok) {
        const details = await res.text().catch(() => "");
        throw new Error(
            `Add failed: ${res.status}${details ? " - " + details : ""}`
        );
    }
    return res.json(); // ✅ backend returns AccountDto
}

// Login
// Login
export async function addLogin(body: LoginDto): Promise<boolean> {
    const res = await fetch(`/login/attemptLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
    });

    if (!res.ok) {
        return false; // login failed
    }

    const text = await res.text();
    return text === "1"; // ✅ backend sends "1" on success
}

// Example of fetching account later
export async function getAccountById(id: number): Promise<AccountDto> {
    const res = await fetch(`${BASE}/Account/getAccount/${id}`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error(`GetAccount failed: ${res.status}`);
    }

    return res.json();
}


