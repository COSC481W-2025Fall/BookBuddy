package com.example.bookbuddy.backend.domain.model;

import jakarta.persistence.*;

@Entity
@Table(name = "book")
public class Book {

    @Id // Primary Key is now ISBN
    @Column(nullable = false, unique = true)
    private String isbn;

    @Column(nullable = false)
    private String bookname;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private String genre;

    public Book() {}

    public Book(String isbn, String bookname, String author, String genre) {
        this.isbn = isbn;
        this.bookname = bookname;
        this.author = author;
        this.genre = genre;
    }

    // Getters and setters
    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }

    public String getBookname() { return bookname; }
    public void setBookname(String bookname) { this.bookname = bookname; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }
}
