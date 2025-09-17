package com.example.bookbuddy.backend.domain.repository;

import com.example.bookbuddy.backend.domain.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    boolean existsByName(String name);
    Optional<Account> findByNameAndPassword(String name, String password);

}

