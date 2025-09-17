package com.example.bookbuddy.backend.infrastructure.service;

import com.example.bookbuddy.backend.domain.mapper.LoginMapper;
import com.example.bookbuddy.backend.domain.model.Account;
import com.example.bookbuddy.backend.domain.model.Login;
import com.example.bookbuddy.backend.domain.repository.AccountRepository;
import com.example.bookbuddy.backend.domain.repository.LoginRepository;
import com.example.bookbuddy.backend.web.dto.LoginDto;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class LoginService {

    private final AccountRepository accountRepository;



    public LoginService( AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }


    public Boolean sendLoginRequest(String name, String password) {
        return accountRepository.findByNameAndPassword(name, password).isPresent();
}
}
