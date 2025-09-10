package com.example.bookbuddy.backend.infrastructure.service;

import com.example.bookbuddy.backend.domain.mapper.AccountMapper;
import com.example.bookbuddy.backend.domain.model.Account;
import com.example.bookbuddy.backend.domain.repository.AccountRepository;
import com.example.bookbuddy.backend.web.dto.AccountDto;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }


    public AccountDto createAccount(AccountDto accountDto) {

        Account newAccount = AccountMapper.INSTANCE.convertToAccount(accountDto);
        this.accountRepository.save(newAccount);
        return AccountMapper.INSTANCE.convertToDto(newAccount);
    }

    public AccountDto getAccountById(Long accountId) {
        return AccountMapper.INSTANCE.convertToDto(this.accountRepository.getById(accountId));
    }
}
