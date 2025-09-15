package com.example.bookbuddy.backend.domain.repository;

import com.example.bookbuddy.backend.domain.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
    boolean existsByName(String name);
}

