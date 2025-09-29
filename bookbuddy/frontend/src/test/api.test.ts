import { assertType, expectTypeOf } from 'vitest'
import * as api from '../api';
import type { AccountDto } from "../types/AccountDto";

//mock fetch
global.fetch = vi.fn();

describe('add account', () => {
    it("returns no error on success", async () => {
        (fetch as any).mockResolvedValueOnce({
          ok: true,
          json: async () => ({ token: "123" }),
    });
    //test accountDto object
    const accountDto: AccountDto = {
        accountId: 1,
        name: 'testName',
        password: 'testPassword',
    }

    //mocked good add account
    const result = await api.addAccount(accountDto);
    expect(result).toEqual({ token: "123" });
    expect(fetch).toHaveBeenCalledWith(
      "/Account/addAccount",
      expect.objectContaining({ method: "POST" })
    );
    });

    //test empty accountDto object
    const emptyAccountDto: AccountDto = {
        accountId: 1,
        name: '',
        password: '',
    }

    //mocked bad add account
    it("returns error on a bad add account", async () => {
        (fetch as any).mockResolvedValueOnce({ ok: false });

        await expect(api.addAccount(emptyAccountDto)).rejects.toThrow("Add failed");
    });

    it("returns account correctly", async () => {
        (fetch as any).mockResolvedValueOnce({
          ok: true,
          json: async () => ({ token: "321" }),
        });

    //mocked good add account
    const returnedAcc = await api.getAccount(1);
    expect(returnedAcc.name == 'testName')
    });
});