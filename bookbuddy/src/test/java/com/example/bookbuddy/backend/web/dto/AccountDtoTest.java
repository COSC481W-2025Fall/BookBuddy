package com.example.bookbuddy.backend.web.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class AccountDtoTest {
    //Test of AccountDto constructor
    @Test
    public void testConstructor() {
        AccountDto accountDto = new AccountDto();
        assertNotNull(accountDto);
    }
}