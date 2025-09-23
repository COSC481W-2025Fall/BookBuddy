package com.example.bookbuddy.backend.domain.repository;

import com.example.bookbuddy.backend.domain.model.UserToBook;
import com.example.bookbuddy.backend.domain.model.Account;
import com.example.bookbuddy.backend.domain.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserToBookRepository extends JpaRepository<UserToBook, Long> {
    List<UserToBook> findByAccount(Account account);
    List<UserToBook> findByBook(Book book);
}
