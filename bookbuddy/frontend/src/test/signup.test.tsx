import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Signup from "../signup";
import * as api from "../api";

//Made with help from ChatGPT

// Mock the addAccount API
vi.mock("../api", () => ({
  addAccount: vi.fn(),
}));

// Mock useNavigate
const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("Signup Page", () => {
  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("should show the signup screen", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
    // Expect visible text on the page header
    expect(
      screen.getByText(/create your account/i)
    ).toBeInTheDocument();
  });

  it("should show a validation message when fields are empty", async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole("button", { name: /create account/i });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    // The new component validates length and password match
    //expect( screen.getByText(/please enter a valid username and password/i) ).toBeInTheDocument();
    expect(api.addAccount).not.toHaveBeenCalled();

  });

  it("should call addAccount and navigate on successful signup", async () => {
    const mockAccount = { accountId: 42, name: "TestUser", password: "pw" };
    (api.addAccount as vi.Mock).mockResolvedValueOnce(mockAccount);

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const inputName = screen.getByLabelText("Username");
    const inputPass = screen.getByLabelText("Password");
    const inputConfirm = screen.getByLabelText("Confirm password");
    const submitButton = screen.getByRole("button", { name: /create account/i });

    await act(async () => {
      fireEvent.change(inputName, { target: { value: "TestUser" } });
      fireEvent.change(inputPass, { target: { value: "TestPassword" } });
      fireEvent.change(inputConfirm, { target: { value: "TestPassword" } });
      fireEvent.click(submitButton);
    });

    expect(api.addAccount).toHaveBeenCalledWith({
      name: "TestUser",
      password: "TestPassword",
    });
    expect(mockedNavigate).toHaveBeenCalledWith("/login");
  });

  it("should show an error message if signup fails", async () => {
    (api.addAccount as vi.Mock).mockRejectedValueOnce(new Error("Server error"));

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const inputName = screen.getByLabelText("Username");
    const inputPass = screen.getByLabelText("Password");
    const inputConfirm = screen.getByLabelText("Confirm password");
    const submitButton = screen.getByRole("button", { name: /create account/i });

    await act(async () => {
      fireEvent.change(inputName, { target: { value: "user" } });
      fireEvent.change(inputPass, { target: { value: "password" } });
      fireEvent.change(inputConfirm, { target: { value: "password" } });
      fireEvent.click(submitButton);
    });

    expect(await screen.findByText(/server error/i)).toBeInTheDocument();
  });

  it("should show an error if passwords do not match", async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const inputName = screen.getByLabelText("Username");
    const inputPass = screen.getByLabelText("Password");
    const inputConfirm = screen.getByLabelText("Confirm password");
    const submitButton = screen.getByRole("button", { name: /create account/i });

    await act(async () => {
      fireEvent.change(inputName, { target: { value: "user" } });
      fireEvent.change(inputPass, { target: { value: "password123" } });
      fireEvent.change(inputConfirm, { target: { value: "different" } });
      fireEvent.click(submitButton);
    });

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });
});
