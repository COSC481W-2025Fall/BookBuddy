package com.example.bookbuddy.backend.domain.repository;

import com.example.bookbuddy.backend.domain.model.UserToBook;
import com.example.bookbuddy.backend.domain.model.Account;
import com.example.bookbuddy.backend.domain.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.repository.query.Param;

import java.util.List;

/*
 * Repository interface for the UserToBook entity. Talks to the database regarding the user-to-book relationship.
 */
public interface UserToBookRepository extends JpaRepository<UserToBook, Long> {
    List<UserToBook> findByAccount(Account account);
    List<UserToBook> findByBook(Book book);

    boolean existsByAccountAndBook(Account account, Book book);
    @Modifying
    @Transactional
    @Query("DELETE FROM UserToBook utb WHERE utb.account = :account AND utb.book = :book")
    void deleteByAccountAndBook(@Param("account") Account account,
                                @Param("book") Book book);



}
