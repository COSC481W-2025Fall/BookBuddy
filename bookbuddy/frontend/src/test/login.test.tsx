import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Routes, Route, MemoryRouter } from "react-router-dom";
import Login from '../login';
import * as api from "../api";
import { act } from 'react';


describe('Login', () => {
    it('should show a login screen', () => {
        render(<MemoryRouter><Login /></MemoryRouter>);
        expect(screen.getAllByText('Welcome back'));
    });
})

// mock dependencies
vi.mock("../api", () => ({
    addLogin: vi.fn(),
}));

const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

test('submits the form correctly', () => {
    afterEach(() => {
      vi.clearAllMocks()
    });
    //(api.addLogin as jest.Mock).mockResolvedValue?.(true); // maybe

    render(<MemoryRouter><Login /></MemoryRouter>);

    const form = document.querySelector('form');

    //input
    const inputName = screen.getByLabelText('Username');
    const inputPass = screen.getByLabelText('Password');

    act(() => {
        fireEvent.change(inputName, { target: { value: 'TestUsername' } });
        fireEvent.change(inputPass, { target: { value: 'TestPassword'} });
        fireEvent.click(screen.getByRole("button", { name: /Login/i }));

        // check that API was called
        expect(api.addLogin).toHaveBeenCalledWith({
            name: "TestUsername",
            password: "TestPassword",
        });

        // check navigation if the username and password are real
        //expect(mockedNavigate).toHaveBeenCalledWith("/search");

        //if the username and password do not exist inside the database
        return screen.findByText(/invalid username or password/i).then((message) => {
            expect(message).toBeInTheDocument();
            expect(api.addLogin).toHaveBeenCalled();
          });
    });

    act(() => {
        fireEvent.change(inputName, { target: { value: '' } });
        fireEvent.change(inputPass, { target: { value: ''} });
        fireEvent.click(screen.getByRole("button", { name: /Login/i }));

        //if the username and password do not exist inside the database
        return screen.findByText(/Please enter a valid username and password/i).then((message) => {
            expect(message).toBeInTheDocument();
            expect(api.addLogin).toHaveBeenCalled();
          });
    });
});