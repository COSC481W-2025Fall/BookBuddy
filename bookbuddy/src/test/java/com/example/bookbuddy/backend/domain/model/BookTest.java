package com.example.bookbuddy.backend.domain.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class BookTest {

    //Book object made to test Book.java class
    Book book = new Book("testIBSN", "testName", "testAuthor", "testGenre", "testCoverId", "testDescription", 0, "testPublication");

    //Test to return IBSN
    @Test
    void getIsbn() {
        assertEquals("testIBSN",  book.getIsbn());
    }

    //Test to set IBSN
    @Test
    void setIsbn() {
        book.setIsbn("testNewISBN");
        assertEquals("testNewISBN", book.getIsbn());
    }

    //Test to return author
    @Test
    void getAuthor() {
        assertEquals("testAuthor", book.getAuthor());
    }

    //Test to set author
    @Test
    void setAuthor() {
        book.setAuthor("testNewAuthor");
        assertEquals("testNewAuthor", book.getAuthor());
    }

    //Test to return genre
    @Test
    void getGenre() {
        assertEquals("testGenre", book.getGenre());
    }

    //Test to set genre
    @Test
    void setGenre() {
        book.setGenre("testNewGenre");
        assertEquals("testNewGenre", book.getGenre());
    }

    //Test to return bookname
    @Test
    void getBookname() {
        assertEquals("testName", book.getBookname());
    }

    //Test to set book name
    @Test
    void setBookname() {
        book.setBookname("testNewBookname");
        assertEquals("testNewBookname", book.getBookname());
    }

    //Test to return cover ID
    @Test
    void getCoverId() {
        assertEquals("testCoverId", book.getCoverid());
    }

    //Test to set cover ID
    @Test
    void setCoverId() {
        book.setCoverid("testNewCoverId");
        assertEquals("testNewCoverId", book.getCoverid());
    }

    //Test to return description
    @Test
    void getDescription() {
        assertEquals("testDescription", book.getDescription());
    }

    //Test to set description
    @Test
    void setDescription() {
        book.setDescription("testNewDescription");
        assertEquals("testNewDescription", book.getDescription());
    }

    //Test to return page count
    @Test
    void getPageCount() {
        assertEquals(0, book.getPagecount());
    }

    //Test to set page count
    @Test
    void setPageCount() {
        book.setPagecount(1);
        assertEquals(1, book.getPagecount());
    }

    //Test to return publication
    @Test
    void getPublication() {
        assertEquals("testPublication", book.getPublication());
    }

    //Test to set publication
    @Test
    void setPublication() {
        book.setPublication("testNewPublication");
        assertEquals("testNewPublication", book.getPublication());
    }

    //Empty book to test empty constructor
    Book emptyBook = new Book();

    //All of these return statements should return null because nothing was set
    @Test
    void getEmptyIsbn() {
        assertNull(emptyBook.getIsbn());
    }

    @Test
    void getEmptyAuthor() {
        assertNull(emptyBook.getAuthor());
    }

    @Test
    void getEmptyGenre() {
        assertNull(emptyBook.getGenre());
    }

    @Test
    void getEmptyBookname() {
        assertNull(emptyBook.getBookname());
    }
}