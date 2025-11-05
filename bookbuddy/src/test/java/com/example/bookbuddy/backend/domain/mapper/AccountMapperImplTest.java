package com.example.bookbuddy.backend.domain.mapper;

import com.example.bookbuddy.backend.domain.model.Account;
import com.example.bookbuddy.backend.web.dto.AccountDto;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class AccountMapperImplTest {
    //Test objects needed for the testing
    Account accountToDto = new Account("TestName", "TestPassword");
    AccountMapperImpl mapper = new AccountMapperImpl();
    AccountDto accountDto = new AccountDto();
    Account DtoToAccount = new Account();

    //Test to get an account database transfer object from an account
    @Test
    void convertToDto() {
        accountDto = mapper.convertToDto(accountToDto);
        assertNotNull(accountDto);
    }

    //Test to get an account from the account transfer database object
    @Test
    void convertToAccount() {
        //account database object is created again from the previous test
        accountDto = mapper.convertToDto(accountToDto);

        //new account object is used to ensure the variables are passed
        DtoToAccount =  mapper.convertToAccount(accountDto);
        assertNotNull(DtoToAccount);
        assertEquals("TestName", DtoToAccount.getName());
        assertEquals("TestPassword", DtoToAccount.getPassword());
    }

    //Empty object used to test the null scenrio
    Account emptyAccount;
    AccountDto emptyAccountDto;

    //Both test should return null
    @Test
    void nullConvertToDto() {
        emptyAccountDto =  mapper.convertToDto(emptyAccount);
        assertNull(emptyAccountDto);
    }

    @Test
    void emptyConvertToAccount() {
        emptyAccount =  mapper.convertToAccount(emptyAccountDto);
    }
}