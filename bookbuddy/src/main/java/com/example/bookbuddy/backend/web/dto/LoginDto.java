package com.example.bookbuddy.backend.web.dto;

public class LoginDto {
    public String name; // Account Name
    public String password; // Account Password

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
