package com.example.bookbuddy.backend.web.search;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Doc {
    private String bookname;
    private String author;
    private String isbn;
    private String genre;
    private String coverid;
    private String publication;
    public int pagecount;
    public String description;

    public Doc() {}

    public Doc(String isbn, String bookname, String author, String genre, String coverid, String description, int pagecount, String publication) {
        this.bookname = bookname;
        this.author = author;
        this.isbn = isbn;
        this.genre = genre;
        this.coverid = coverid;
        this.publication = publication;
        this.pagecount = pagecount;
        this.description = description;
    }

    public String getBookname() { return bookname; }
    public String getAuthor() { return author; }
    public String getIsbn() { return isbn; }
    public String getGenre() { return genre; }
    public String getCoverid() {return coverid;}
    public String getPublication() {return publication;}
    public int getPagecount() {return pagecount;}
    public String getDescription() {return description;}


    public void setCoverid(String bookid) {this.coverid = bookid;}
    public void setPublication(String publicationdate) {this.publication = publication;}
    public void setPagecount(int pagecount) {this.pagecount = pagecount;}
    public void setDescription(String description) {this.description = description;}
    public void setBookname(String bookname) { this.bookname = bookname; }
    public void setAuthor(String author) { this.author = author; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
    public void setGenre(String genre) { this.genre = genre; }
}
