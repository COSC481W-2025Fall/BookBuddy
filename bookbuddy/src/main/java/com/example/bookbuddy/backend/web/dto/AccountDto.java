package com.example.bookbuddy.backend.web.dto;

public class AccountDto {
    public Long accountId;   // Account ID
    public String name;      // Account Name
    public String password;  // Account Password
    public int aiLimit;      // Limit of how many times an account can use the Buddy AI

    public AccountDto() {}

    public Long getAccountId() {
        return accountId;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public int getAiLimit() {
        return aiLimit;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setAiLimit(int aiLimit) {
        this.aiLimit = aiLimit;
    }
}