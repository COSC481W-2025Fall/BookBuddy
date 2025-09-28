package com.example.bookbuddy.backend.web.controller;

import com.example.bookbuddy.backend.domain.model.Account;
import com.example.bookbuddy.backend.domain.repository.AccountRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * AuthController handles user authentication and account creation.
 *
 * Provides endpoints for:
 *  - Logging in with a username and password
 *  - Signing up by creating a new account
 *
 * Uses HttpSession to track the currently logged-in user by storing their accountId.
 */

@RestController
@RequestMapping("/auth")
public class AuthController {

    // Injected repository for performing CRUD operations on Account entities
    private final AccountRepository accountRepository;

    public AuthController(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    /**
     * POST /auth/login
     * Attempts to log in a user with the provided name and password.
     * If successful, stores the userId in the session and returns a success message.
     *
     * @param name     the account username
     * @param password the account password
     * @param session  the HTTP session used to track logged-in users
     * @return success or failure message
     */

    @PostMapping("/login")
    public String login(@RequestParam String name, @RequestParam String password, HttpSession session) {
        Optional<Account> accountOpt = accountRepository.findByNameAndPassword(name, password);
        if (accountOpt.isPresent()) {
            //Takes the userId of the current logged in user
            session.setAttribute("userId", accountOpt.get().getAccountId());
            return "Login successful for user " + name;
        } else {
            return "Invalid credentials";
        }
    }

    /**
     * POST /auth/signup
     * Registers a new user if the username is not already taken.
     *
     * @param name     the desired username
     * @param password the chosen password
     * @return message indicating success or if the username already exists
     */

    @PostMapping("/signup")
    public String signup(@RequestParam String name, @RequestParam String password) {
        if (accountRepository.existsByName(name)) {
            // prevent duplicate accounts
            return "Username already exists";
        }
        // create new account and updates the database
        Account account = new Account(name, password);
        accountRepository.save(account);
        return "Account created successfully";
    }
}
