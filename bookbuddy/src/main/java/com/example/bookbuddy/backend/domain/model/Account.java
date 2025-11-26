package com.example.bookbuddy.backend.domain.model;

import jakarta.persistence.*;

@Entity
@Table(name = "account")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Long accountId;


    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private int aiLimit;

    public Account() {}

    public Account(String name, String password) {
        this.name = name;
        this.password = password;
    }

    // Getters and setters
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getAiLimit() {
        return aiLimit;
    }
    public void setAiLimit(int aiLimit) {
        this.aiLimit = aiLimit;
    }
}

