package com.example.bookbuddy.backend.domain.repository;


import com.example.bookbuddy.backend.domain.model.WishBook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WishBookRepository extends JpaRepository<WishBook, String> {

    /**
     * Custom finder method that retrieves a Book by its ISBN.
     *
     * @param isbn the ISBN of the book to search for
     * @return an Optional containing the Book if found, or empty if not
     */
    Optional<WishBook> findByIsbn(String isbn);
}



