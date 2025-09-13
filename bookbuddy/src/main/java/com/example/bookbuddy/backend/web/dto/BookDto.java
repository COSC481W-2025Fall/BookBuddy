package com.example.bookbuddy.backend.web.dto;

public class BookDto {

    private Long isbn;
    private String bookname;
    private String author;
    private String genre;

    public BookDto() {}

    public BookDto(Long isbn, String bookname, String author, String genre) {
        this.isbn = isbn;
        this.bookname = bookname;
        this.author = author;
        this.genre = genre;
    }

    public Long getIsbn() {
        return isbn;
    }

    public void setIsbn(Long isbn) {
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

}
