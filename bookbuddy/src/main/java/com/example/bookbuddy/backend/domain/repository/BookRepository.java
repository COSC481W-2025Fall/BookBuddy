package com.example.bookbuddy.backend.domain.repository;

import com.example.bookbuddy.backend.domain.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
