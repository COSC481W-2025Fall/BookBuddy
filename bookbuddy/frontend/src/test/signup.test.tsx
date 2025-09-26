import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Routes, Route, MemoryRouter } from "react-router-dom";
import Signup from '../signup';
import * as api from "../api";
import { act } from 'react';

describe('Signup Page', () => {
    it('should show the signup screen', () => {
        render(<MemoryRouter><Signup /></MemoryRouter>);
        expect(screen.getAllByText('Sign up'));
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

    render(<MemoryRouter><Signup /></MemoryRouter>);

    var form = screen.getByRole('form');

    //input
    const inputName = screen.getByPlaceholderText('Username');
    const inputPass = screen.getByPlaceholderText('Password');

    act(() => {
        fireEvent.change(inputName, { target: { value: '' } });
        fireEvent.change(inputPass, { target: { value: ''} });
        fireEvent.click(screen.getByRole("button", { id: /signupBtn/i }));

        //if the username and password do not exist inside the database
        return screen.findByText(/Username and password cannot be empty/i).then((message) => {
            expect(message).toBeInTheDocument();
            expect(api.addAccount).toHaveBeenCalled();
        });

        fireEvent.change(inputName, { target: { value: 'TestUsername' } });
        fireEvent.change(inputPass, { target: { value: 'TestPassword'} });
        fireEvent.click(screen.getByRole("button", { id: /signupBtn/i }));

        // check that API was called
        expect(api.addAccount).toHaveBeenCalledWith({
            name: "TestUsername",
            password: "TestPassword",
        });
    });
});