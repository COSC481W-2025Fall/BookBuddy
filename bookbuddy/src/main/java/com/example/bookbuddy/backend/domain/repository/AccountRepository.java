package com.example.bookbuddy.backend.domain.repository;

import com.example.bookbuddy.backend.domain.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for Account entity.
 * Provides built-in CRUD operations and custom queries.
 */
@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    /**
     * Find an account by username and password.
     *
     * @param name     the account's username
     * @param password the account's password
     * @return an Optional containing the Account if found, or empty if not
     */
    Optional<Account> findByNameAndPassword(String name, String password);
    boolean existsByName(String name);
}
