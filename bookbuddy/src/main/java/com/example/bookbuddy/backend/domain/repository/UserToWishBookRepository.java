package com.example.bookbuddy.backend.domain.repository;

import com.example.bookbuddy.backend.domain.model.*;
import com.example.bookbuddy.backend.domain.model.Account;
import com.example.bookbuddy.backend.domain.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/*
 * Repository interface for the UserToBook entity. Talks to the database regarding the user-to-book relationship.
 */
public interface UserToWishBookRepository extends JpaRepository<UserToWishBook, Long> {
    List<UserToWishBook> findByAccount(Account account);
    List<UserToWishBook> findByWishBook(WishBook wishbook);

    boolean existsByAccountAndWishBook(Account account, WishBook wishbook);
    @Modifying
    @Transactional
    @Query("DELETE FROM UserToWishBook uwb WHERE uwb.account = :account AND uwb.wishBook = :wishbook")
    void deleteByAccountAndWishBook(@Param("account") Account account,
                                    @Param("wishbook") WishBook wishbook);



}
