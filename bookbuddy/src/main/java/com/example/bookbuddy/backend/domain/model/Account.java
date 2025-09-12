package com.example.bookbuddy.backend.domain.model;

import jakarta.persistence.*;

@Entity
@Table(name = "account")
public class Account {

    @Id // Primary Key:
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;

    public Account() {}

    public Account(String name, String password) {
        this.name = name;
        this.password = password;
    }

    public String getPassword(){
        return this.password;
    }
    public void setPassword(String password){
        this.password = password;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
