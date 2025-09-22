package com.example.bookbuddy.backend.domain.model;

import jakarta.persistence.*;

/**
 * UserToBook entity represents the relationship between a user and a book
 * in the database. It is a join/mapping table linking a user
 * (through userId) to a book (through ISBN).
 */

@Entity
@Table(name = "user_to_book")
public class UserToBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // surrogate primary key

    @Column(nullable = false)
    private Long userId; //For the user who is actually logged in adding the book

    @Column(nullable = false)
    private String isbn; //For the book that the user is wanting to add to their library

    //Constructors
    public UserToBook() {}

    public UserToBook(Long userId, String isbn) {
        this.userId = userId;
        this.isbn = isbn;
    }
    //Getters and Setters
    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public String getIsbn() { return isbn; }

    public void setUserId(Long userId) { this.userId = userId; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
}
