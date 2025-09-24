import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Routes, Route } from "react-router-dom";
import { MemoryRouter } from 'react-router-dom'
import Login from '../login';


//import { cleanup } from '@testing-library/react';

//import matchers from '@testing-library/jest-dom/matchers';

//expect.extend(matchers);


describe('Login', () => {
    it('should show a login screen', () => {
        render(<MemoryRouter><Login /></MemoryRouter>);
        expect(screen.getAllByText('Login'));
    });
})

/*
//cleans up doms if affected during testing
afterEach(() => {
  cleanup();
});
*/