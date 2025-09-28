package com.example.bookbuddy.backend.web.controller;

import com.example.bookbuddy.backend.domain.model.Account;
import com.example.bookbuddy.backend.domain.repository.AccountRepository;
import com.example.bookbuddy.backend.web.dto.LoginDto;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/login")
public class LoginController {

    private final AccountRepository accountRepository;

    public LoginController(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @PostMapping("/attemptLogin")
    public ResponseEntity<String> attemptLogin(@RequestBody LoginDto loginDto, HttpSession session) {
        System.out.println("Login attempt: " + loginDto.getName() + " / " + loginDto.getPassword());

        Optional<Account> accountOpt = accountRepository.findByNameAndPassword(
                loginDto.getName(), loginDto.getPassword()
        );

        System.out.println("Query result present? " + accountOpt.isPresent());

        if (accountOpt.isPresent()) {
            Account account = accountOpt.get();

            // ✅ Save userId in session for later use
            session.setAttribute("userId", account.getAccountId());

            // ✅ Return "1" to indicate success (matches frontend expectation)
            return ResponseEntity.ok("1");
        } else {
            // ❌ Return "0" to indicate failure
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("0");
        }
    }
}
