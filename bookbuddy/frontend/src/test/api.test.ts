import { describe, it, expect, vi, afterEach } from "vitest";
import * as api from "../api";
import type { AccountDto } from "../types/AccountDto";
import type { BookDto } from "../types/BookDto";
import type { WishBookDto } from "../types/WishBookDto";

global.fetch = vi.fn();

//Test creation was assisted by ChatGPT

//test for using the api to add an account to the database
describe("API: addAccount", () => {
    afterEach(() => {
      vi.clearAllMocks();
    });

  it("returns parsed JSON on success", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ accountId: 99, name: "testUser" }),
    });

    const accountDto: AccountDto = {
      accountId: 1,
      name: "testName",
      password: "testPassword",
    };

    const result = await api.addAccount(accountDto);
    expect(result).toEqual({ accountId: 99, name: "testUser" });

    expect(fetch).toHaveBeenCalledWith(
      "/Account/addAccount",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  it("throws an error on failed response", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => "Internal Server Error",
    });

    const accountDto: AccountDto = {
      accountId: 1,
      name: "fail",
      password: "badPass",
    };

    await expect(api.addAccount(accountDto)).rejects.toThrow(
      /Add failed: 500/
    );
  });
});

//test for using the api to get an account
describe("API: getAccount", () => {
  it("returns account correctly on success", async () => {
    const mockAccount = { accountId: 1, name: "testName", password: "testPassword" };

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockAccount,
    });

    const result = await api.getAccount(1);
    expect(result).toEqual(mockAccount);
    expect(fetch).toHaveBeenCalledWith("/login/attemptLogin/1");
  });

  it("throws error if response not ok", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(api.getAccount(1)).rejects.toThrow(/Get failed: 404/);
  });
});

//test to see if it returns the account by the ID
describe("API: getAccountById", () => {
  it("returns account JSON on success", async () => {
    const mockAccount = { accountId: 2, name: "Ryan" };

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockAccount,
    });

    const result = await api.getAccountById(2);
    expect(result).toEqual(mockAccount);
    expect(fetch).toHaveBeenCalledWith(
      "/Account/getAccount/2",
      expect.objectContaining({
        method: "GET",
        credentials: "include",
      })
    );
  });

  it("throws an error on failed response", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 403,
    });

    await expect(api.getAccountById(1)).rejects.toThrow(
      /GetAccount failed: 403/
    );
  });
});

//test to see if a library is returned
describe("API: getMyLibrary", () => {
  it("returns list of books on success", async () => {
    const mockBooks: BookDto[] = [
      { author: 'testAuthor',
        genre: 'testGenre',
        isbn: 'testIsbn',
        image: 'testImage',
        description: 'testDescription',
        pagecount: 0,
        publication: 'testPublication',
        coverid: 'testCoverId', },

      { author: 'testAuthor2',
        genre: 'testGenre2',
        isbn: 'testIsbn2',
        image: 'testImage2',
        description: 'testDescription2',
        pagecount: 2,
        publication: 'testPublication2',
        coverid: 'testCoverId2', },
    ];

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockBooks,
      status: 200,
    });

    const result = await api.getMyLibrary();
    expect(result).toEqual(mockBooks);
    expect(fetch).toHaveBeenCalledWith(
      "/books/my-library",
      expect.objectContaining({
        method: "GET",
        credentials: "include",
      })
    );
  });

  it("throws AUTH error if 401 or 403", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 401,
    });

    await expect(api.getMyLibrary()).rejects.toThrow("AUTH");
  });

  it("throws generic error on other failure", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(api.getMyLibrary()).rejects.toThrow(
      /Failed to fetch library: 500/
    );
  });
});

//same thing but now its a wishbook
describe("API: getMyWishBook", () => {
  it("returns list of wishbooks on success", async () => {
    const mockWishBooks: WishBookDto[] = [
      { bookId: 1, title: "WishBook A", author: "Someone", isbn: "abc", genre: "Romance" },
    ];

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockWishBooks,
      status: 200,
    });

    const result = await api.getMyWishBook();
    expect(result).toEqual(mockWishBooks);
    expect(fetch).toHaveBeenCalledWith(
      "/wishbooks/my-library",
      expect.objectContaining({
        method: "GET",
        credentials: "include",
      })
    );
  });

  it("throws AUTH error if 401 or 403", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 403,
    });

    await expect(api.getMyWishBook()).rejects.toThrow("AUTH");
  });

  it("throws generic error on other failure", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(api.getMyWishBook()).rejects.toThrow(
      /Failed to load wishlist: 500/
    );
  });
});

//test to add a book
describe("API: addBook", () => {
  it("returns book JSON on success", async () => {
    const mockBook: BookDto = {
      author: 'testAuthor',
      genre: 'testGenre',
      isbn: 'testIsbn',
      image: 'testImage',
      description: 'testDescription',
      pagecount: 0,
      publication: 'testPublication',
      coverid: 'testCoverId',
    };

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockBook,
    });

    const result = await api.addBook(mockBook);
    expect(result).toEqual(mockBook);

    expect(fetch).toHaveBeenCalledWith(
      "/Book/addBook",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
    );
  });

  it("throws on failed response", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 400,
    });

    const book: BookDto = {
      author: 'testAuthor',
      genre: 'testGenre',
      isbn: 'testIsbn',
      image: 'testImage',
      description: 'testDescription',
      pagecount: 0,
      publication: 'testPublication',
      coverid: 'testCoverId',
    };

    await expect(api.addBook(book)).rejects.toThrow(/Book addition failed: 400/);
  });
});
