package com.example.bookbuddy.backend.domain.model;

import jakarta.persistence.*;

/**
 * UserToBook entity represents the relationship between a user and a book
 * in the database. It is a join/mapping table linking a user
 * (through userId) to a book (through ISBN).
 */

@Entity
@Table(name = "user_to_wishbook")
public class UserToWishBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // surrogate primary key

    // Many-to-One relationship to Account
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, referencedColumnName = "account_id")
    private Account account;

    // Many-to-One relationship to Book
    @ManyToOne
    @JoinColumn(name = "isbn", nullable = false, referencedColumnName = "isbn")
    private WishBook wishBook;

    public UserToWishBook() {}

    public UserToWishBook(Account account, WishBook wishBook) {
        this.account = account;
        this.wishBook = wishBook;
    }

    public Long getId() { return id; }
    public Account getAccount() { return account; }
    public WishBook getWishBook() { return wishBook; }

    public void setAccount(Account account) { this.account = account; }
    public void setWishBook(WishBook wishbook) { this.wishBook = wishbook; }
}
