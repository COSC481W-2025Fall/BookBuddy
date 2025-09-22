package com.example.bookbuddy.backend.web.controller;

import com.example.bookbuddy.backend.infrastructure.service.AccountService;
import com.example.bookbuddy.backend.web.dto.AccountDto;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


//Changes made by Noah: Essentially incorporated HttpSession session) {
//        AccountDto newAccount = accountService.createAccount(accountDto);
//to keep track of current logged in user
@RestController
@RequestMapping("/Account")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/addAccount")
    public ResponseEntity<AccountDto> addAccount(@RequestBody AccountDto accountDto,
                                                 HttpSession session) {
        AccountDto newAccount = accountService.createAccount(accountDto);


        session.setAttribute("userId", newAccount.accountId);

        return new ResponseEntity<>(newAccount, HttpStatus.CREATED);
    }

    @GetMapping("/getAccount/{AccountId}")
    public ResponseEntity<AccountDto> getAccount(@PathVariable Long AccountId) {
        AccountDto retrievedAccount = accountService.getAccountById(AccountId);
        return new ResponseEntity<>(retrievedAccount, HttpStatus.OK);
    }

    @GetMapping("/ping")
    public String ping() {
        return "App is running!";
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<String> handleConflict(IllegalStateException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleBadRequest(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}
