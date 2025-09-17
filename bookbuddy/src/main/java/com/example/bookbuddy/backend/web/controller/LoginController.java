package com.example.bookbuddy.backend.web.controller;

import com.example.bookbuddy.backend.domain.mapper.LoginMapper;
import com.example.bookbuddy.backend.domain.model.Login;
import com.example.bookbuddy.backend.infrastructure.service.LoginService;
import com.example.bookbuddy.backend.web.dto.LoginDto;
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
    public ResponseEntity<String> addLogin(@RequestBody LoginDto loginDto) {
        boolean accountExists = this.loginService.sendLoginRequest(
                loginDto.getName(),    // 👈 directly use fields
                loginDto.getPassword()
        );

        if (accountExists) {
            return ResponseEntity.ok("1");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("0");
        }
    }
}
