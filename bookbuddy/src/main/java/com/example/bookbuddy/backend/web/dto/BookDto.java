package com.example.bookbuddy.backend.web.dto;

import com.example.bookbuddy.backend.domain.model.Book;

public class BookDto {

    private String isbn;
    private String bookname;
    private String author;
    private String genre;

    public BookDto() {}

    public BookDto(String isbn, String bookname, String author, String genre) {
        this.isbn = isbn;
        this.bookname = bookname;
        this.author = author;
        this.genre = genre;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getBookname() {
        return bookname;
    }

    public void setBookname(String bookname) {
        this.bookname = bookname;
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

    /**
     * Convert this DTO into a Book entity.
     * This is used in controllers when saving to the database.
     */
    public Book toBook() {
        return new Book(isbn, bookname, author, genre);
    }
}
