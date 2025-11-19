package com.example.bookbuddy.backend.infrastructure.service;

import com.example.bookbuddy.backend.domain.mapper.AccountMapperImpl;
import com.example.bookbuddy.backend.domain.model.Account;
import com.example.bookbuddy.backend.domain.repository.AccountRepository;
import com.example.bookbuddy.backend.web.dto.AccountDto;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest
@Transactional
class AccountServiceTest {
    //Uses the actual database to run this test via this @Autowired
    //Real database should not be affected after the fact
/*
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountService accountService;

    //These tests only works when the docker container is running
    //Test to simulate an account being created
    @Test
    void createAccount() {
        Account testAccount = new Account("NameSoLongNoOneShouldEverUseOrConsiderUsing", "Password");
        AccountMapperImpl accountMapper = new AccountMapperImpl();
        AccountDto testAccountDto =  accountMapper.convertToDto(testAccount);

        AccountDto createdAccount = accountService.createAccount(testAccountDto);
        //Test the returned Dto object
        assertNotNull(createdAccount);

        //See if the name is intact
        assertEquals("NameSoLongNoOneShouldEverUseOrConsiderUsing", accountMapper.convertToAccount(createdAccount).getName());

        //See if the Account is inside the database
        assertTrue(accountRepository.existsByName("NameSoLongNoOneShouldEverUseOrConsiderUsing"));
    }

    @Test
    void getAccountById() {
        //Accounts dont have IDs ever set inside the code itself, just inside the database
        //here is what a test for ID would probably look like


        Account testAccount = new Account("NameSoLongNoOneShouldEverUseOrConsiderUsing", "Password");
        AccountMapperImpl accountMapper = new AccountMapperImpl();
        AccountDto testAccountDto =  accountMapper.convertToDto(testAccount);

        AccountDto createdAccount = accountService.createAccount(testAccountDto);

        assertNotNull(accountService.getAccountById(testAccount.getAccountId()));
    }
    */
}