package com.example.bookbuddy.backend.domain.model;

import jakarta.persistence.*;

@Entity
@Table(name = "account")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String password;

    // 👉 Required by JPA
    public Account() {
    }

    // 👉 Convenience constructor (used in your AuthController)
    public Account(String name, String password) {
        this.name = name;
        this.password = password;
    }

    // Getters & setters
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

    // Debug-friendly toString (don’t log raw password)
    @Override
    public String toString() {
        return "Account{" +
                "accountId=" + accountId +
                ", name='" + name + '\'' +
                ", password='[PROTECTED]'" +
                '}';
    }
}
