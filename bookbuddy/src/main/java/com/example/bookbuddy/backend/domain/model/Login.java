package com.example.bookbuddy.backend.domain.model;


import jakarta.persistence.*;

@Entity
@Table(name = "login")
public class Login {

    @Id // Primary Key:
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loginId;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String password;

    public Login() {}

    public Login(String name, String password) {
        this.name = name;
        this.password = password;
    }

    public Long getLoginId() {
        return loginId;
    }

    public void setLoginId(Long loginId) {
        this.loginId = loginId;
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
}
