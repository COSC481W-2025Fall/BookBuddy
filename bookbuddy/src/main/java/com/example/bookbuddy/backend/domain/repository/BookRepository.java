package com.example.bookbuddy.backend.domain.repository;

import com.example.bookbuddy.backend.domain.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * Repository interface for the Book entity.
 *
 * Extends JpaRepository to inherit standard CRUD operations:
 *  - save(), findById(), findAll(), deleteById(), etc.
 *
 * Additional query methods can be defined here following Spring Data JPA
 * naming conventions (e.g., findByTitle, findByAuthor).
 */

public interface BookRepository extends JpaRepository<Book, Long> {

    /**
     * Custom finder method that retrieves a Book by its ISBN.
     *
     * @param isbn the ISBN of the book to search for
     * @return an Optional containing the Book if found, or empty if not
     */
    Optional<Book> findByIsbn(String isbn);
}

