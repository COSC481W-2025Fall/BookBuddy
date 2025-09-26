import { assertType, expectTypeOf } from 'vitest'
import type { AccountDto } from "../types/AccountDto";

test('AccountDto.ts type works properly', () => {
    //test accountDto object
    const accountDto: AccountDto = {
        accountId: 1,
        name: 'testName',
        password: 'testPassword',
    }

    //testing properties
    expect(accountDto).toHaveProperty('accountId');
    expect(accountDto).toHaveProperty('name');
    expect(accountDto).toHaveProperty('password');

    //testing types
    expect(typeof accountDto.accountId).toBe('number');
    expect(typeof accountDto.name).toBe('string');
    expect(typeof accountDto.password).toBe('string');
});