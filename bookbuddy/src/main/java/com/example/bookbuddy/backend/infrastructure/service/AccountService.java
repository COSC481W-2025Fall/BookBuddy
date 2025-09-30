package com.example.bookbuddy.backend.infrastructure.service;

import com.example.bookbuddy.backend.domain.mapper.AccountMapper;
import com.example.bookbuddy.backend.domain.model.Account;
import com.example.bookbuddy.backend.domain.repository.AccountRepository;
import com.example.bookbuddy.backend.web.dto.AccountDto;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public AccountDto createAccount(AccountDto accountDto) {
        System.out.println("➡️ Starting createAccount with DTO: " + accountDto);

        // Validate input
        if (accountDto == null || !StringUtils.hasText(accountDto.name) || !StringUtils.hasText(accountDto.password)) {
            System.out.println("❌ Validation failed: empty username or password");
            throw new IllegalArgumentException("Username and password must not be empty");
        }

        accountDto.name = accountDto.name.trim();

        // Duplicate username check
        if (accountRepository.existsByName(accountDto.name)) {
            System.out.println("⚠️ Duplicate username attempted: " + accountDto.name);
            throw new IllegalStateException("Account name already exists");
        }

        // Map DTO → Entity
        Account newAccount = AccountMapper.INSTANCE.convertToAccount(accountDto);
        System.out.println("✅ Mapped Account before save: " + newAccount);

        // Save and flush to ensure ID is generated
        newAccount = accountRepository.saveAndFlush(newAccount);
        System.out.println("✅ Saved Account with ID: " + newAccount.getAccountId());

        // Map Entity → DTO
        AccountDto savedDto = AccountMapper.INSTANCE.convertToDto(newAccount);
        System.out.println("✅ Returning AccountDto: " + savedDto);

        return savedDto;
    }

    public AccountDto getAccountById(Long accountId) {
        System.out.println("➡️ Fetching account by ID: " + accountId);
        return AccountMapper.INSTANCE.convertToDto(this.accountRepository.getById(accountId));
    }
}
