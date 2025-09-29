import { assertType, expectTypeOf } from 'vitest'
import type { LoginDto } from "../types/LoginDto";

test('LoginDto.ts type works properly', () => {
    //test LoginDto object
    const loginDto: LoginDto = {
        name: 'testName',
        password: 'testPassword',
    }

    //testing properties
    expect(loginDto).toHaveProperty('name');
    expect(loginDto).toHaveProperty('password');

    //testing types
    expect(typeof loginDto.name).toBe('string');
    expect(typeof loginDto.password).toBe('string');
});