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
        // Validate input
        if (accountDto == null || !StringUtils.hasText(accountDto.name) || !StringUtils.hasText(accountDto.password)) {
            throw new IllegalArgumentException("Username and password must not be empty");
        }

        accountDto.name = accountDto.name.trim();

        // Duplicate username -> treat as a business conflict, not a 500
        if (accountRepository.existsByName(accountDto.name)) {
            throw new IllegalStateException("Account name already exists");
        }

        Account newAccount = AccountMapper.INSTANCE.convertToAccount(accountDto);
        this.accountRepository.save(newAccount);
        return AccountMapper.INSTANCE.convertToDto(newAccount);
    }

    public AccountDto getAccountById(Long accountId) {
        return AccountMapper.INSTANCE.convertToDto(this.accountRepository.getById(accountId));
    }
}
