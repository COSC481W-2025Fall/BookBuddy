export async function addAccount(body: AccountDto): Promise<AccountDto> {
    const res = await fetch(`${BASE}/Account/addAccount`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include", // ✅ keeps cookies consistent with other endpoints
    });

    if (!res.ok) {
        const details = await res.text().catch(() => "");
        throw new Error(`Add failed: ${res.status}${details ? " - " + details : ""}`);
    }

    return res.json();
}

export async function addLogin(body: LoginDto): Promise<boolean> {
    const res = await fetch(`${BASE}/login/attemptLogin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include", // ✅ same here
    });

    if (!res.ok) return false;
    const text = await res.text();
    return text.trim() === "1";
}


