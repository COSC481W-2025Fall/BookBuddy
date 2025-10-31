package com.example.bookbuddy.backend.domain.repository;

import com.example.bookbuddy.backend.domain.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/*
 * Repository interface for the UserToBook entity. Talks to the database regarding the user-to-book relationship.
 */
public interface UserToWishBookRepository extends JpaRepository<UserToWishBook, Long> {
    List<UserToWishBook> findByAccount(Account account);
    List<UserToWishBook> findByWishBook(WishBook wishbook);

    boolean existsByAccountAndWishBook(Account account, WishBook wishbook);
}
