import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Signup from "../signup";
import * as api from "../api";

// Wrote with help from ChatGPT

// -------------------- Mock API --------------------
vi.mock("../api", () => ({
  addAccount: vi.fn(),
  addLogin: vi.fn(),
}));

// -------------------- Mock useNavigate --------------------
const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("Signup + Login Page", () => {
  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  // -------------------- Helpers --------------------
  const openSignup = async () => {
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /signup/i }));
    });
  };

  const openLogin = async () => {
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /login/i }));
    });
  };

  // -------------------- TESTS --------------------

  it("shows the signup form after clicking Signup", async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    await openSignup();

    expect(
      screen.getByText(/create your account/i)
    ).toBeInTheDocument();
  });

  it("shows validation error if password is too short", async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    await openSignup();

    const submit = screen.getByRole("button", { name: /create account/i });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/username/i), {
        target: { value: "User1" },
      });
      fireEvent.change(screen.getByLabelText(/^password$/i), {
        target: { value: "123" },
      });
      fireEvent.change(screen.getByLabelText(/confirm password/i), {
        target: { value: "123" },
      });
      fireEvent.click(submit);
    });

    expect(
      screen.getByText(/password must be at least 6 characters/i)
    ).toBeInTheDocument();

    expect(api.addAccount).not.toHaveBeenCalled();
  });

  it("shows error if passwords do not match", async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    await openSignup();

    const submit = screen.getByRole("button", { name: /create account/i });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/username/i), {
        target: { value: "User1" },
      });
      fireEvent.change(screen.getByLabelText(/^password$/i), {
        target: { value: "password123" },
      });
      fireEvent.change(screen.getByLabelText(/confirm password/i), {
        target: { value: "notmatch" },
      });
      fireEvent.click(submit);
    });

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it("calls addAccount and shows success message", async () => {
    (api.addAccount as vi.Mock).mockResolvedValueOnce({ ok: true });

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    await openSignup();

    const name = screen.getByLabelText(/username/i);
    const pass = screen.getByLabelText(/^password$/i);
    const confirm = screen.getByLabelText(/confirm password/i);
    const submit = screen.getByRole("button", { name: /create account/i });

    await act(async () => {
      fireEvent.change(name, { target: { value: "User1" } });
      fireEvent.change(pass, { target: { value: "password123" } });
      fireEvent.change(confirm, { target: { value: "password123" } });
      fireEvent.click(submit);
    });

    expect(api.addAccount).toHaveBeenCalledWith({
      name: "User1",
      password: "password123",
    });

    expect(
      screen.getByText(/signup successful — proceed to login/i)
    ).toBeInTheDocument();
  });

  it("shows signup failure message", async () => {
    (api.addAccount as vi.Mock).mockRejectedValueOnce(
      new Error("Server error")
    );

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    await openSignup();

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/username/i), {
        target: { value: "User1" },
      });
      fireEvent.change(screen.getByLabelText(/^password$/i), {
        target: { value: "password123" },
      });
      fireEvent.change(screen.getByLabelText(/confirm password/i), {
        target: { value: "password123" },
      });
      fireEvent.click(screen.getByRole("button", { name: /create account/i }));
    });

    expect(screen.getByText(/server error/i)).toBeInTheDocument();
  });

  // -------------------- LOGIN TESTS --------------------

    it("logs in successfully and navigates", async () => {
      (api.addLogin as vi.Mock).mockResolvedValueOnce({
        name: "User1",
      });

      render(
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      );

      await openLogin();

      await act(async () => {
        fireEvent.change(screen.getByLabelText(/username/i), {
          target: { value: "User1" },
        });
        fireEvent.change(screen.getByLabelText(/^password$/i), {
          target: { value: "password123" },
        });
        fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
      });

      expect(api.addLogin).toHaveBeenCalled();
      expect(mockedNavigate).toHaveBeenCalledWith("/search");
    });

    it("shows login error on failure", async () => {
      (api.addLogin as vi.Mock).mockRejectedValueOnce(
        new Error("Login failed")
      );

      render(
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      );

      await openLogin();

      await act(async () => {
        fireEvent.change(screen.getByLabelText(/username/i), {
          target: { value: "User1" },
        });
        fireEvent.change(screen.getByLabelText(/^password$/i), {
          target: { value: "password123" },
        });
        fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
      });

      expect(screen.getByText(/login failed/i)).toBeInTheDocument();
    });
  });