import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Signup from "../signup";
import * as api from "../api";

//Some tests made with help from ChatGPT

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
  //resets the the mocks after each test
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
    //getAll returns an array so im just seeing if the first element is there
    expect(screen.getAllByText("Signup")[0]).toBeInTheDocument();
  });

  //tests if you leave the username or password empty the validation message shows
  it("should show a validation message when fields are empty", async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const form = screen.getByRole("form");
    const submitButton = screen.getByRole("button", { name: /signup/i });

    await act(async () => {
      fireEvent.submit(form);
    });

    expect(
      screen.getByText(/please enter a valid username and password/i)
    ).toBeInTheDocument();
    expect(api.addAccount).not.toHaveBeenCalled();
  });

  //tests if addAccount is called when a good username and password are entered
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
    const form = screen.getByRole("form");

    await act(async () => {
      fireEvent.change(inputName, { target: { value: "TestUser" } });
      fireEvent.change(inputPass, { target: { value: "TestPassword" } });
      fireEvent.submit(form);
    });

    expect(api.addAccount).toHaveBeenCalledWith({
      name: "TestUser",
      password: "TestPassword",
    });

    expect(localStorage.getItem("accountId")).toBe("42");
    expect(localStorage.getItem("username")).toBe("TestUser");
    expect(mockedNavigate).toHaveBeenCalledWith("/search");
  });

  //if there is a server error, this test sees if it says
  it("should show an error message if signup fails", async () => {
    (api.addAccount as vi.Mock).mockRejectedValueOnce(new Error("Server error"));

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const inputName = screen.getByLabelText("Username");
    const inputPass = screen.getByLabelText("Password");
    const form = screen.getByRole("form");

    await act(async () => {
      fireEvent.change(inputName, { target: { value: "user" } });
      fireEvent.change(inputPass, { target: { value: "pass" } });
      fireEvent.submit(form);
    });

    expect(
      await screen.findByText(/server error\. please try again later\./i)
    ).toBeInTheDocument();
  });

  //test to see if there is a bad user inputted
  it("should show an error if API returns no accountId", async () => {
    (api.addAccount as vi.Mock).mockResolvedValueOnce({ name: "baduser" });

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const inputName = screen.getByLabelText("Username");
    const inputPass = screen.getByLabelText("Password");
    const form = screen.getByRole("form");

    await act(async () => {
      fireEvent.change(inputName, { target: { value: "baduser" } });
      fireEvent.change(inputPass, { target: { value: "pw" } });
      fireEvent.submit(form);
    });

    expect(
      screen.getByText(/signup failed\. please try again\./i)
    ).toBeInTheDocument();
  });
});
