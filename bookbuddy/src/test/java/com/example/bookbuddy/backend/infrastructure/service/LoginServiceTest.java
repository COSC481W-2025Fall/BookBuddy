package com.example.bookbuddy.backend.infrastructure.service;

import com.example.bookbuddy.backend.domain.model.Account;
import com.example.bookbuddy.backend.domain.repository.AccountRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class LoginServiceTest {
    //Uses the actual database to run this test via this @Autowired
    //Real database should not be affected after the fact
    /*
    @Autowired
    private AccountService accountService;

    @Autowired
    private AccountRepository accountRepository;

    //This test only works when the docker container is running
    //Test to simulate a request with an account not in the database
    @Test
    void sendBadLoginRequest() {
        Account account = new Account("NameSoLongNoOneShouldEverUseOrConsiderUsing", "Password");
        //NOT ADDING THE ACCOUNT TO THE REPO THIS TIME

        LoginService loginService = new LoginService(accountRepository);

        assertFalse(loginService.sendLoginRequest(account.getName(), account.getPassword()));
    }

    //Test to have a successful login request
    @Test
    void sendLoginRequest() {
        Account account = new Account("NameSoLongNoOneShouldEverUseOrConsiderUsing", "Password");
        //Adding the account to the repository
        accountRepository.save(account);

        LoginService loginService = new LoginService(accountRepository);

        assertTrue(loginService.sendLoginRequest(account.getName(), account.getPassword()));
    }
    */
}