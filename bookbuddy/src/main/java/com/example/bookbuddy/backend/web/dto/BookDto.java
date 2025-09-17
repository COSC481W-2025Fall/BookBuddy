package com.example.bookbuddy.backend.web.dto;

public class BookDto {

<<<<<<< Updated upstream
    private String isbn;
=======
    private Long isbn;
>>>>>>> Stashed changes
    private String bookname;
    private String author;
    private String genre;

    public BookDto() {}

<<<<<<< Updated upstream
    public BookDto(String isbn, String bookname, String author, String genre) {
=======
    public BookDto(Long isbn, String bookname, String author, String genre) {
>>>>>>> Stashed changes
        this.isbn = isbn;
        this.bookname = bookname;
        this.author = author;
        this.genre = genre;
    }

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
