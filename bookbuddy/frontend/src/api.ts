// ===========================
// Imports
// ===========================
import type { AccountDto } from "./types/AccountDto";
import type { BookDto } from "./types/BookDto";
import type { LoginDto } from "./types/LoginDto";
import type { WishBookDto } from "./types/WishBookDto";

// ✅When deployed on Render, leave BASE empty so it uses the same origin as Spring Boot
const BASE = "";

// ===========================
// Health check
// ===========================
export async function ping(): Promise<string> {
    const res = await fetch(`${BASE}/Account/ping`);
    if (!res.ok) throw new Error(`Ping failed: ${res.status}`);
    return res.text();
}

// ===========================
// Signup
// ===========================
export async function addAccount(body: AccountDto): Promise<AccountDto> {
    const res = await fetch(`${BASE}/Account/addAccount`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
    });

    if (!res.ok) {
        const details = await res.text().catch(() => "");
        throw new Error(`Add failed: ${res.status}${details ? " - " + details : ""}`);
    }

    return res.json();
}

// ===========================
// Login
// ===========================
export async function addLogin(body: LoginDto): Promise<boolean> {
    const res = await fetch(`${BASE}/login/attemptLogin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
    });

    if (!res.ok) return false;
    const text = await res.text();
    return text.trim() === "1";
}

// ===========================
// Get account info
// ===========================
export async function getAccount(identifier: string | number): Promise<AccountDto> {
    const res = await fetch(`${BASE}/login/attemptLogin/${encodeURIComponent(String(identifier))}`);
    if (!res.ok) throw new Error(`Get failed: ${res.status}`);
    return res.json();
}

// ===========================
// Get account by ID
// ===========================
export async function getAccountById(id: number): Promise<AccountDto> {
    const res = await fetch(`${BASE}/Account/getAccount/${id}`, {
        method: "GET",
        credentials: "include",
    });
    if (!res.ok) throw new Error(`GetAccount failed: ${res.status}`);
    return res.json();
}
export async function getCurrentUser(): Promise<AccountDto> {
    const res = await fetch(`/Account/getCurrentUser`, { credentials: "include" });
    if (!res.ok) throw new Error(`GetCurrentUser failed: ${res.status}`);
    return res.json();
}
// ===========================
// Get user's library
// ===========================
export async function getMyLibrary(): Promise<BookDto[]> {
    const res = await fetch(`${BASE}/books/my-library`, {
        method: "GET",
        credentials: "include",
    });
    if (res.status === 401 || res.status === 403) throw new Error("AUTH");
    if (!res.ok) throw new Error(`Failed to fetch library: ${res.status}`);
    return res.json();
}

// ===========================
// Get user's wishlist
// ===========================
export async function getMyWishBook(): Promise<WishBookDto[]> {
    const res = await fetch(`${BASE}/wishbooks/my-library`, {
        method: "GET",
        credentials: "include",
    });
    if (res.status === 401 || res.status === 403) throw new Error("AUTH");
    if (!res.ok) throw new Error(`Failed to load wishlist: ${res.status}`);
    return res.json();
}

// ===========================
// Add a book
// ===========================
export async function addBook(body: BookDto): Promise<BookDto> {
    const res = await fetch(`${BASE}/Book/addBook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
    });
    if (!res.ok) throw new Error(`Book addition failed: ${res.status}`);
    return res.json();
}

// ===========================
// Remove book from user's library
// ===========================
export async function removeFromLibrary(isbn: string): Promise<void> {
    const res = await fetch(`${BASE}/books/remove/${encodeURIComponent(isbn)}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (res.status === 401 || res.status === 403) {
        throw new Error("AUTH");
    }

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to remove book: ${res.status}${text ? " - " + text : ""}`);
    }
}
//Remove book from wishlist
export async function removeFromWishlist(isbn: string): Promise<void> {
    const res = await fetch(`${BASE}/wishbooks/remove/${encodeURIComponent(isbn)}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (res.status === 401 || res.status === 403) {
        throw new Error("AUTH");
    }

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to remove wishlist book: ${res.status}${text ? " - " + text : ""}`);
    }
}


// export async function SendQeustions(body: string[] | any[]): Promise<void> {
//     try {
//         console.log({BASE})
//         const response = await fetch(`${BASE}/api/sendquestions`, {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json',},
//             body: JSON.stringify(body),
//             credentials: "include",
//         });
//
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//
//     } catch (err) {
//         console.error("Error sending array:", err);
//         throw err;
//     }


export async function SendQeustions(body: string[]): Promise<{ response: string }> {
    const res = await fetch(`/api/sendquestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions: body.join(", ") }),
        credentials: "include",
    });

    if (!res.ok) {
        const details = await res.text().catch(() => "");
        throw new Error(`Cant ask questions: ${res.status}${details ? " - " + details : ""}`);
    }
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return res.json();
    } else {
        const text = await res.text();
        return { response: text };
    }
}