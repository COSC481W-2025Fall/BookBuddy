package com.example.bookbuddy.backend.web.dto;

public class AccountDto {

    public Long accountId;   // Account ID
    public String name;      // Account name (username)
    public String password;  // Account password

    @Override
    public String toString() {
        return "AccountDto{" +
                "accountId=" + accountId +
                ", name='" + name + '\'' +
                ", password='[PROTECTED]'" +   // hide raw password
                '}';
    }
}
