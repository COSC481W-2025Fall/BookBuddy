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
            System.out.println(" Entering createAccount()");
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

            newAccount.setAiLimit(7);


            // Save to DB
            newAccount = accountRepository.save(newAccount);
            System.out.println(" Saved entity (after save): accountId=" + newAccount.getAccountId());

            // Convert back to DTO
            AccountDto result = AccountMapper.INSTANCE.convertToDto(newAccount);
            System.out.println(" Returning DTO: accountId=" + result.accountId +
                    ", name=" + result.name +
                    ", aiLimit=" + result.aiLimit);



            return result;

        } catch (Exception e) {
            System.out.println(" ERROR inside createAccount(): " + e.getMessage());
            e.printStackTrace(); // full stack trace in Render logs
            throw e; // rethrow so controller’s @ExceptionHandler catches it
        }
    }
    public AccountDto getAccountAiLimit(Long accountId) {
        System.out.println("Fetching AI limit for account ID=" + accountId);
        Account account = accountRepository.getById(accountId);
        AccountDto accountDto = AccountMapper.INSTANCE.convertToDto(account);
        System.out.println(" AI limit for account ID=" + accountId + " is " + accountDto.aiLimit);
        return accountDto;
    }

    public AccountDto getAccountById(Long accountId) {
        System.out.println(" Looking up account with ID=" + accountId);
        Account account = accountRepository.getById(accountId);
        return AccountMapper.INSTANCE.convertToDto(account);
    }
//    public AccountDto changeAccountAiLimit(Long accountId, int newAiLimit) {
//        System.out.println("Updating AI limit for account =" + accountId + " to " + newAiLimit);
//        Account account = accountRepository.getById(accountId);
//        account.setAiLimit(newAiLimit);
//        Account updatedAccount = accountRepository.save(account);
//        System.out.println(" Updated AI limit for account =" + accountId + " to " + updatedAccount.getAiLimit());
//        return AccountMapper.INSTANCE.convertToDto(updatedAccount);
//    }  ============================ Ben keep for future use to change ai limit directly

    public AccountDto changeAiUse(Long accountId) {
        System.out.println("Entering consumeAiUse() for account ID=" + accountId);

        // Fetch account safely
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("Account not found"));

        int currentLimit = account.getAiLimit();
        System.out.println("Current AI limit: " + currentLimit);

        // Check if limit reached
        if (currentLimit <= 0) {
            System.out.println("AI limit reached for account ID=" + accountId);
            throw new IllegalStateException("AI usage limit reached");
        }

        // Reduce limit by 1
        int updatedLimit = currentLimit - 1;
        account.setAiLimit(updatedLimit);

        // Save new value
        Account updatedAccount = accountRepository.save(account);

        System.out.println("AI limit decremented. New limit: " + updatedLimit);

        // Return updated DTO
        return AccountMapper.INSTANCE.convertToDto(updatedAccount);
    }
}

