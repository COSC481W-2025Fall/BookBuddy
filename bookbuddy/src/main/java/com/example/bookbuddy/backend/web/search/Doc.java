package com.example.bookbuddy.backend.web.search;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Doc {
    private String bookname;
    private String author;
    private String isbn;
    private String genre;

    public Doc() {}

    public Doc(String bookname, String author, String isbn, String genre) {
        this.bookname = bookname;
        this.author = author;
        this.isbn = isbn;
        this.genre = genre;
    }

    public String getBookname() { return bookname; }
    public String getAuthor() { return author; }
    public String getIsbn() { return isbn; }
    public String getGenre() { return genre; }

    public void setBookname(String bookname) { this.bookname = bookname; }
    public void setAuthor(String author) { this.author = author; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
    public void setGenre(String genre) { this.genre = genre; }
}
