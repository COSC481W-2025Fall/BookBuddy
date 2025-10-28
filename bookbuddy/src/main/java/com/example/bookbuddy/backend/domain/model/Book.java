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

    @Column(nullable = false)
    private String coverid;

    //text is needed here to allow for long descriptions, database can usually only handle up to 255 characters
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private int pagecount;

    @Column(nullable = false)
    private String publication;
    public Book() {}

    public Book(String isbn, String bookname, String author, String genre, String coverid, String description, int pagecount, String publication) {
        this.isbn = isbn;
        this.bookname = bookname;
        this.author = author;
        this.genre = genre;
        this.coverid = coverid;
        this.description = description;
        this.pagecount = pagecount;
        this.publication = publication;
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

    public String getCoverid() {return coverid;}
    public void setCoverid(String coverid) {this.coverid = coverid;}

    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}

    public int getPagecount() {return pagecount;}
    public void setPagecount(int pagecount) {this.pagecount = pagecount;}

    public String getPublication() {return publication;}
    public void setPublication(String publication) {this.publication = publication;}
}
