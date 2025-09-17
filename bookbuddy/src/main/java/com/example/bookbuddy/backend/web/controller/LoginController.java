package com.example.bookbuddy.backend.web.controller;

import com.example.bookbuddy.backend.domain.mapper.LoginMapper;
import com.example.bookbuddy.backend.domain.model.Login;
import com.example.bookbuddy.backend.infrastructure.service.LoginService;
import com.example.bookbuddy.backend.web.dto.LoginDto;
import org.mapstruct.Mapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")

public class LoginController {

    public LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/attemptLogin")
    public ResponseEntity<LoginDto> addLogin(@RequestBody LoginDto loginDto) {
        Login login = LoginMapper.INSTANCE.convertToLogin(loginDto);
        Boolean loginExists = this.loginService.sendLoginRequest(login);
        if(loginExists) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }




}
