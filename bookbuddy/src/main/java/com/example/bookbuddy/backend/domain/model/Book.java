package com.example.bookbuddy.backend.domain.model;

import jakarta.persistence.*;
@Entity
@Table(name = "book")
public class Book {
<<<<<<< Updated upstream
//    @Id
    @Column(nullable = true)
    private String isbn;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // auto-increment
    private Long id;
=======
    @Id
    private Long isbn;
>>>>>>> Stashed changes

    @Column(nullable = false)
    private String bookname;

    @Column(nullable = false)
    private String author;
<<<<<<< Updated upstream
    @Column(nullable = true)
=======
    @Column(nullable = false)
>>>>>>> Stashed changes
    private String genre;

    public Book() {}

<<<<<<< Updated upstream
    public Book(String isbn, String bookname, String author, String genre) {
=======
    public Book(Long isbn, String bookname, String author, String genre) {
>>>>>>> Stashed changes
        this.isbn = isbn;
        this.bookname = bookname;
        this.author = author;
        this.genre = genre;
    }

    // Getters and setters for MapStruct and JPA

<<<<<<< Updated upstream
    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
=======
    public Long getIsbn() {
        return isbn;
    }

    public void setIsbn(Long isbn) {
>>>>>>> Stashed changes
        this.isbn = isbn;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getBookname() {
        return bookname;
    }

    public void setBookname(String bookname) {
        this.bookname = bookname;
    }
}
