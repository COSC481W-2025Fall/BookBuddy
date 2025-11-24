package com.example.bookbuddy.backend.infrastructure.service;

import com.example.bookbuddy.backend.domain.mapper.AccountMapper;
import com.example.bookbuddy.backend.domain.model.Account;
import com.example.bookbuddy.backend.domain.repository.AccountRepository;
import com.example.bookbuddy.backend.web.dto.AccountDto;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public AccountService(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AccountDto createAccount(AccountDto accountDto) {
        try {
            System.out.println("➡ Entering createAccount()");
            System.out.println(" Incoming DTO: name=" + accountDto.name + ", password=" + accountDto.password);

            // Validate input
            if (accountDto == null || !StringUtils.hasText(accountDto.name) || !StringUtils.hasText(accountDto.password)) {
                System.out.println(" Validation failed: empty username or password");
                throw new IllegalArgumentException("Username and password must not be empty");
            }

            accountDto.name = accountDto.name.trim();

            // Check duplicate username
            if (accountRepository.existsByName(accountDto.name)) {
                System.out.println(" Duplicate username: " + accountDto.name);
                throw new IllegalStateException("Account name already exists");
            }

            // Hash the password before saving
            accountDto.password = passwordEncoder.encode(accountDto.password);

            // Convert to entity
            Account newAccount = AccountMapper.INSTANCE.convertToAccount(accountDto);
            System.out.println(" Mapped entity (before save): " + newAccount);

            // Save to DB
            newAccount = accountRepository.save(newAccount);
            System.out.println("💾 Saved entity (after save): accountId=" + newAccount.getAccountId());

            // Convert back to DTO
            AccountDto result = AccountMapper.INSTANCE.convertToDto(newAccount);
            System.out.println(" Returning DTO: accountId=" + result.accountId + ", name=" + result.name);

            return result;

        } catch (Exception e) {
            System.out.println(" ERROR inside createAccount(): " + e.getMessage());
            e.printStackTrace(); // full stack trace in Render logs
            throw e; // rethrow so controller’s @ExceptionHandler catches it
        }
    }

    public AccountDto getAccountById(Long accountId) {
        System.out.println("🔎 Looking up account with ID=" + accountId);
        Account account = accountRepository.getById(accountId);
        return AccountMapper.INSTANCE.convertToDto(account);
    }
}
