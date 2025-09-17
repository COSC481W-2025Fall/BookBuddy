package com.example.bookbuddy.backend.web.controller;

import com.example.bookbuddy.backend.infrastructure.service.AccountService;
import com.example.bookbuddy.backend.web.dto.AccountDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Account")
public class AccountController {

    public AccountService AccountService;

    public AccountController(AccountService AccountService) {
        this.AccountService = AccountService;
    }

    @PostMapping("/addAccount")
    public ResponseEntity<AccountDto> addAccount(@RequestBody AccountDto AccountDto) {
        AccountDto newAccount = AccountService.createAccount(AccountDto);
        return new ResponseEntity<>(newAccount, HttpStatus.CREATED);
    }

    @GetMapping("/getAccount/{AccountId}")
    public ResponseEntity<AccountDto> getAccount(@PathVariable Long AccountId) {
        AccountDto retrievedAccount = AccountService.getAccountById(AccountId);
        return new ResponseEntity<>(retrievedAccount, HttpStatus.OK);

    }
//    @GetMapping("/getAccount")
//    public ResponseEntity<AccountDto> getAccount(@RequestBody String name, String password) {
//        AccountDto retrievedAccount = AccountService.getAccountById(accountId);
//        return new ResponseEntity<>(retrievedAccount, HttpStatus.OK);
//
//    }


    @GetMapping("/ping")
    public String ping() {
        return "App is running!";
    }

    // Map duplicate name and validation errors to proper HTTP codes
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<String> handleConflict(IllegalStateException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleBadRequest(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

}
