package com.example.bookbuddy.backend.domain.repository;

import com.example.bookbuddy.backend.domain.model.UserToBook;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Repository interface for the UserToBook entity.
 *
 * This repository manages the "link" table that associates users with books.
 * It inherits all CRUD operations from JpaRepository:
 *   - save(), findById(), findAll(), deleteById(), etc.
 *
 * Additional custom queries can be defined here using Spring Data JPA
 * naming conventions.
 */

public interface UserToBookRepository extends JpaRepository<UserToBook, Long> {

    /**
     * Finds all UserToBook associations for a given user.
     *
     * @param userId the ID of the user
     * @return a list of UserToBook entries that represent
     *         all books linked to the specified user
     */
    List<UserToBook> findByUserId(Long userId);
}
