package com.example.bookbuddy.backend.infrastructure.service;

import com.example.bookbuddy.backend.domain.mapper.LoginMapper;
import com.example.bookbuddy.backend.domain.model.Account;
import com.example.bookbuddy.backend.domain.model.Login;
import com.example.bookbuddy.backend.domain.repository.AccountRepository;
import com.example.bookbuddy.backend.domain.repository.LoginRepository;
import com.example.bookbuddy.backend.web.dto.LoginDto;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;
@Service
public class LoginService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginService( AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Boolean sendLoginRequest(String name, String input_password, HttpSession session) {
        try {
            //Gets the account associated with the username inputted
            Account account = accountRepository.findByName(name).get();
            //With this account we can get the password from the username
            String hashedPassword = account.getPassword();

            //we can use the encoder "matches" method to see if the unhashed password is equal to the hashed one
            if (passwordEncoder.matches(input_password, hashedPassword)) {
                //session ID is set here now for the library and adding books to work
                session.setAttribute("userId", account.getAccountId());
                return true;
            } else {
                //if the username is in the database but the password is incorrect
                return false;
            }
        } catch (NoSuchElementException e) {
            //If the username doesn't exist inside the database an exception is thrown
            return false;
        }
    }
}

//Input = username and unhashed password
//Get the hashed password from the username
//Use the "matches" function
//If the username is in the database and the returned Accounts password is equal to the hash, the user is authenticated