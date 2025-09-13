package com.example.bookbuddy.backend.domain.model;

import jakarta.persistence.*;
@Entity
@Table(name = "book")
public class Book {
    @Id
    private Long isbn;

    @Column(nullable = false)
    private String bookname;

    @Column(nullable = false)
    private String author;
    @Column(nullable = false)
    private String genre;

    public Book() {}

    public Book(Long isbn, String bookname, String author, String genre) {
        this.isbn = isbn;
        this.bookname = bookname;
        this.author = author;
        this.genre = genre;
    }

    // Getters and setters for MapStruct and JPA

    public Long getIsbn() {
        return isbn;
    }

    public void setIsbn(Long isbn) {
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
